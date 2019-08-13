import * as mongoose from 'mongoose';
import { DbNameEnum } from '../../shared/dbName.enum';

export const projectsSchema = new mongoose.Schema({
  projectName: { type: String, required: [true, 'Project Name is required'] },
  projectAccess: { type: String },
  projectVersion: { type: String, default: 'v_1.0' },
  members: {
    type: Array,
    default: [],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: DbNameEnum.users },
    userName: { type: String, dafault: null },
    isEmailSent: { type: Boolean },
    isInviteAccepted: { type: Boolean },
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
