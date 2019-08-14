import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbNameEnum } from '../shared/dbName.enum';
import { Document, Model, Types } from 'mongoose';
import { ProjectsModel } from './models/projects.model';
import { CreateProjectsDto } from './models/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(DbNameEnum.projects) private readonly _projectModel: Model<ProjectsModel & Document>) {
  }

  async getAll() {
    return await this._projectModel.find().populate('memberDetails').exec();
  }

  async add(project: CreateProjectsDto) {
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

    const createProject = await this._projectModel.create(projectModel);

    if (createProject) {
      // const projectMembers: ProjectsModel['members'] = [];
      // project.membersList.forEach(member => {
      //   if (member.userId) {
      //     projectMembers.push({
      //       isEmailSent: false, isInviteAccepted: false, userId: new Types.ObjectId(member.userId),
      //     });
      //   }
      // });
      // return this._projectModel.findByIdAndUpdate(createProject.id, {
      //   members: projectMembers,
      // });
      return createProject;
    } else {
      return 'Project creation error!';
    }
  }
}
