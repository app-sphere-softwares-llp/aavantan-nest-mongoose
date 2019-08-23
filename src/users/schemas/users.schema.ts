import * as mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({

  email: { type: String, unique: true, required: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },

}, {
  timestamps: true,
});
