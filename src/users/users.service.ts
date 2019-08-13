import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { UsersModel } from './models/users.model';
import { DbNameEnum } from '../shared/dbName.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(DbNameEnum.users) private readonly _usersModel: Model<UsersModel & Document>) {
  }

  async getAll() {
    return await this._usersModel.find({}).exec();
  }
}
