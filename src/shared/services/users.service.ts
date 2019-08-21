import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { DbNameEnum } from '../../consts/dbName.enum';
import { UsersModel } from '../../users/models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(DbNameEnum.users) private readonly _usersModel: Model<UsersModel & Document>) {
  }

  async getAll() {
    return await this._usersModel.find({}).exec();
  }
}
