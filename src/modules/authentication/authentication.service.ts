import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/registerUser.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userData: any, res: Response): Promise<any> {
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

  async login(userData: any, res: Response): Promise<any> {
    try {
      let user = await this.userModel.findOne({
        username: userData.loginIdentifier,
      });

      if (!user) {
        user = await this.userModel.findOne({
          email: userData.loginIdentifier,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username/email or password. Please try again.',
        });
      }

      const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid username/email or password. Please try again.',
        });
      }

      const payload = {
        id: user._id.toString(),
        username: user.username,
      };

      const token = this.jwtService.sign(payload);

      return res.status(201).json({
        message: `User ${userData.loginIdentifier} login successfully!`,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res
        .status(400)
        .json({ message: 'Failed to login user. Please try again later.' });
    }
  }
}
