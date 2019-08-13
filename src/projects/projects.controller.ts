import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectsDto } from './models/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly _projectsService: ProjectsService) {
  }

  @Get()
  async getAll() {
    return await this._projectsService.getAll();
  }

  @Post()
  async add(@Body() project: CreateProjectsDto) {
    return await this._projectsService.add(project);
  }
}
