import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/registerUser.schema';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(userData: any, res: Response) {
    try {
      const existingUsername = await this.userModel.findOne({
        username: userData.username,
      });

      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists.' });
      }

      const existingEmail = await this.userModel.findOne({
        email: userData.email,
      });

      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);

      const hashedPass = await bcrypt.hash(userData.passwords.password, salt);

      const newUser = new this.userModel({
        username: userData.username,
        name: userData.name,
        birthday: userData.birthday,
        email: userData.email,
        password: hashedPass,
        salt: salt,
      });

      await newUser.save();

      return res.status(201).json({
        message: `User ${userData.username} registered successfully!`,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res
        .status(400)
        .json({ message: 'Failed to register user. Please try again later.' });
    }
  }
}
