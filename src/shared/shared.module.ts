import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbNameEnum } from '../consts/dbName.enum';
import { projectsSchema } from '../projects/schemas/projects.schema';
import { usersSchema } from '../users/schemas/users.schema';
import { ProjectsService } from './services/projects.service';
import { UsersService } from './services/users.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: DbNameEnum.projects,
      collection: DbNameEnum.projects,
      schema: projectsSchema,
    }, {
      name: DbNameEnum.users,
      schema: usersSchema,
      collection: DbNameEnum.users,
    }]),
  ],
  exports: [ProjectsService, UsersService],
  providers: [ProjectsService, UsersService],
})
export class SharedModule {
}
