import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from './schemas/users.schema';
import { DbNameEnum } from '../shared/dbName.enum';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{
      name: DbNameEnum.users,
      schema: usersSchema,
      collection: DbNameEnum.users,
    }]),
  ],
})
export class UsersModule {
}
