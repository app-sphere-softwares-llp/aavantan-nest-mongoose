import * as mongoose from 'mongoose';
import { UsersModel } from '../models/users.model';

export const usersSchema = new mongoose.Schema({

  email: { type: String, unique: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },

}, {
  timestamps: true,
});
