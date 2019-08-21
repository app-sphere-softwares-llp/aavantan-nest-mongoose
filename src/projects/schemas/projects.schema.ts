import * as mongoose from 'mongoose';
import { DbNameEnum } from '../../consts/dbName.enum';
import { ProjectsModel } from '../models/projects.model';
import { UsersModel } from '../../users/models/users.model';
import { usersSchema } from '../../users/schemas/users.schema';

export const projectsSchema = new mongoose.Schema({
  projectName: { type: String, required: [true, 'Project Name is required'] },
  projectAccess: { type: String },
  projectVersion: { type: String, default: 'v_1.0' },
  members: {
    type: Array,
    default: [],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: DbNameEnum.users },
    emailId: { type: String },
    isEmailSent: { type: Boolean },
    isInviteAccepted: { type: Boolean },
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
})
  .set('toObject', { virtuals: true })
  .set('toJSON', { virtuals: true });

// virtual
projectsSchema.virtual('memberDetails', {
  ref: DbNameEnum.users,
  localField: 'members.userId',
  foreignField: '_id',
});

// hooks

// projectsSchema.post<ProjectsModel & mongoose.Document>('save', async (doc, next, err) => {
//   const unRegisteredUsers = doc.members.filter(f => !f.userId);
//   const registeredUsers = doc.members.filter(f => f.userId);
//
//   const unRegisteredUsersModelArray: UsersModel[] = [];
//   const registeredUsersModelArray: UsersModel[] = [];
//
//   unRegisteredUsers.forEach(user => {
//     unRegisteredUsersModelArray.push({
//       email: user.emailId,
//       facebookId: null,
//       googleId: null,
//       password: null,
//     });
//   });
//   const userModel = mongoose.model(DbNameEnum.users, usersSchema);
//   try {
//     await userModel.find({});
//     // await userModel.create({
//     //   email: 'ishara',
//     //   facebookId: null,
//     //   googleId: null,
//     //   password: null,
//     // });
//   } catch (e) {
//     console.log(e);
//   }
//   next();
//   // userModel.create({
//   //   email: 'ishara',
//   //   facebookId: null,
//   //   googleId: null,
//   //   password: null,
//   // }).then(() => {
//   //   console.log('Done');
//   //   next();
//   // }).catch((e) => {
//   //   console.log(e);
//   //   next();
//   // });
// });
