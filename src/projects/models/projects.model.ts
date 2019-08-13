export class ProjectsModel {
  projectName: string;
  projectAccess: string;
  projectVersion: string;
  members?: Array<{
    userId: string,
    userName?: string,
    isEmailSent?: boolean,
    isInviteAccepted?: boolean
  }>;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
