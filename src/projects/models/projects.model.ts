import * as mongoose from 'mongoose';

export class ProjectsModel {
  projectName: string;
  projectAccess: string;
  projectVersion: string;
  members?: Array<{
    userId: mongoose.Types.ObjectId,
    emailId?: string;
    isEmailSent?: boolean,
    isInviteAccepted?: boolean
  }>;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
