import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [],
  controllers: [ProjectsController],
  imports: [
    SharedModule
  ],
})
export class ProjectsModule {
}
