import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbNameEnum } from '../shared/dbName.enum';
import { projectsSchema } from './schemas/projects.schema';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    MongooseModule.forFeature([{
      name: DbNameEnum.projects,
      collection: DbNameEnum.projects,
      schema: projectsSchema,
    }]),
  ],
})
export class ProjectsModule {
}
