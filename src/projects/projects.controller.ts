import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectsDto } from './models/projects.dto';
import * as mongoose from 'mongoose';
import { DbNameEnum } from '../consts/dbName.enum';
import { usersSchema } from '../users/schemas/users.schema';
import { ProjectsService } from '../shared/services/projects.service';
import { UsersService } from '../shared/services/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly _projectsService: ProjectsService,
              private readonly _userService: UsersService) {
  }

  @Get()
  async getAll() {
    return await this._projectsService.getAll();
  }

  @Post()
  async add(@Body() project: CreateProjectsDto) {
    return await this._projectsService.add(project);
  }

  @Get('test')
  async testUser() {
    return await this._userService.getAll();
  }
}
