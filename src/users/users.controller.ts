import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // tslint:disable-next-line:variable-name
  constructor(private readonly _userService: UsersService) {
  }

  @Get()
  async getAll() {
    return await this._userService.getAll();
  }
}
