import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [],
  controllers: [UsersController],
  imports: [
    SharedModule,
  ],
})
export class UsersModule {
}
