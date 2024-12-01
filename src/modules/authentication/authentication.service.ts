import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/registerUser.schema';
import * as bcrypt from 'bcrypt';
import { AgeService } from './helpers/age.service';

import { VerifyUser, VerifyUserDocument } from './schemas/verifyUser.schema';
import { MailService } from '../../shared/mail/services/mail.service';

import * as fs from 'fs';
import * as path from 'path';
import { UserInfo, UserInfoDocument } from './schemas/userInfo.schema';

// User Statuses

// 0 - email not verified
// 1 - account is active
// 2 - account is banned

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    @InjectModel(VerifyUser.name)
    private verifyUserModel: Model<VerifyUserDocument>,
    @InjectModel(UserInfo.name)
    private userInfoModel: Model<UserInfoDocument>,
    private readonly jwtService: JwtService,
    private readonly ageService: AgeService,
    private mailService: MailService,
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

      const isUnder16 = this.ageService.isUnder16(userData.birthday);

      if (isUnder16) {
        return res.status(422).json({ message: 'The user is under 16' });
      }

      const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);

      const hashedPass = await bcrypt.hash(userData.passwords.password, salt);

      const defaultImage = {
        data: Buffer.from('').toString('base64'),
        contentType: '',
      };

      const newUser = new this.userModel({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        password: hashedPass,
        profileImage: defaultImage,
        bannerImage: defaultImage,
        salt: salt,
        status: 0,
      });

      await newUser.save();

      const user = await this.userModel.findOne({ email: userData.email });

      const userToken = this.mailService.generateEmailToken();

      const verifyUser = new this.verifyUserModel({
        userId: user._id,
        token: userToken,
      });

      await verifyUser.save();

      const userVerifyData = {
        email: userData.email,
        name: userData.name,
        token: userToken,
      };

      const newUserInfo = new this.userInfoModel({
        userId: user._id,
        birthday: userData.birthday,
      });

      await newUserInfo.save();

      const subject = 'Verify Email';

      this.mailService.sendEmailVerification(userVerifyData, subject);

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

      console.log(user.status);

      if (user.status === 0) {
        return res.status(403).json({
          message: 'Please verify your email to continue!',
        });
      }

      const payload = {
        id: user._id.toString(),
        username: user.username,
      };

      const userInfo = {
        name: user.name,
        username: user.username,
        email: user.email,
      };

      const token = this.jwtService.sign(payload);

      return res.status(201).json({
        message: `User ${userData.loginIdentifier} login successfully!`,
        token,
        userInfo,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res
        .status(400)
        .json({ message: 'Failed to login user. Please try again later.' });
    }
  }

  async verifyEmail(token, res) {
    try {
      const foundedToken = await this.verifyUserModel.findOne({ token: token });

      if (!foundedToken) {
        return;
      }

      await this.userModel.updateOne(
        { _id: foundedToken.userId },
        { $set: { status: 1 } },
      );

      await this.verifyUserModel.deleteOne({ token: token });

      res.redirect('http://localhost:4200');
    } catch (error) {
      console.error('Login error:', error);
      return res
        .status(400)
        .json({ message: 'Failed to verify user. Please try again later.' });
    }
  }

  async sendJwt(userData, res) {
    try {
      let user = await this.userModel.findOne({
        username: userData.username,
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username/email or password. Please try again.',
        });
      }

      const payload = {
        id: user._id.toString(),
        username: user.username,
      };

      const token = this.jwtService.sign(payload);

      console.log(token);

      return res.status(201).json({
        message: `User ${userData.loginIdentifier} login successfully!`,
        token,
      });
    } catch (error) {}
  }
}
