import { ProjectsModel } from './projects.model';

export class CreateProjectsDto extends ProjectsModel {
  membersList: Array<{ userId: string, emailId: string }>;
}
