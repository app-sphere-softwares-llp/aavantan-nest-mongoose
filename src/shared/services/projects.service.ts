import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Document, Model, Types } from 'mongoose';
import { DbNameEnum } from '../../consts/dbName.enum';
import { ProjectsModel } from '../../projects/models/projects.model';
import { UsersModel } from '../../users/models/users.model';
import { CreateProjectsDto } from '../../projects/models/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(DbNameEnum.projects) private readonly _projectModel: Model<ProjectsModel & Document>,
    @InjectModel(DbNameEnum.users) private readonly _usersModel: Model<UsersModel & Document>) {
  }

  async getAll() {
    return await this._projectModel.find().populate('memberDetails').exec();
  }

  async add(project: CreateProjectsDto) {
    let session: ClientSession;
    session = await this._projectModel.db.startSession();
    session.startTransaction();
    try {
      // prepare project model
      const projectModel = new ProjectsModel();

      projectModel.projectName = project.projectName;
      projectModel.projectAccess = project.projectAccess;
      projectModel.createdAt = project.createdAt;
      projectModel.createdBy = project.createdBy;
      projectModel.updatedAt = project.updatedAt;
      projectModel.updatedBy = project.updatedBy;
      projectModel.projectVersion = project.projectVersion;

      projectModel.members = project.membersList.map(m => {
        return {
          userId: m.userId ? new Types.ObjectId(m.userId) : null,
          emailId: m.emailId || null,
          isEmailSent: false,
          isInviteAccepted: false,
        };
      });

      // create project
      const createProject = await this._projectModel.create([projectModel], { session });

      if (createProject) {
        // get all unregistered users
        const unRegisteredUsers = projectModel.members.filter(f => !f.userId);
        const unRegisteredUsersModelArray: UsersModel[] = [];
        unRegisteredUsers.forEach(user => {
          unRegisteredUsersModelArray.push({
            email: user.emailId,
            facebookId: null,
            googleId: null,
            password: null,
          });
        });
        // create unregistered users
        const createdUsers = await this._usersModel.create(unRegisteredUsersModelArray, { session });

        // send mail

        // update project model array with newly created users
        const updatedMembers = projectModel.members.map(pm => {
          if (!pm.userId) {
            pm.userId = new Types.ObjectId(createdUsers.find(f => f.email === pm.emailId).id);
          }
          return pm;
        });
        // update project
        await this._projectModel.update({ _id: createProject[0].id }, { members: updatedMembers }, { session });
        await session.commitTransaction();
        session.endSession();
        return this._projectModel.findById(createProject[0].id);
      } else {
        await session.abortTransaction();
        session.endSession();
        return 'Project creation error!';
      }
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      return e;
    }
  }
}
