import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../../authentication/schemas/registerUser.schema';
import {
  UserInfo,
  UserInfoDocument,
} from '../../../authentication/schemas/userInfo.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>,
  ) {}
  async uploadProfileImage() {}

  async getInitialUserData(
    username: string,
    res: any,
    currUserId,
  ): Promise<any> {
    try {
      let user = await this.userModel.findOne({
        username: username,
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username. Please try again.',
        });
      }

      let isProfileOwner = false;

      if (currUserId === user.id) {
        isProfileOwner = true;
      }

      const data = {
        userData: {
          name: user.name,
          profileImage: user.profileImage,
          bannerImage: user.bannerImage,
          username: user.username,
        },
        isProfileOwner,
      };

      return res.status(200).json({
        message: 'User data fetched successfully!',
        data,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(400).json({ message: 'Failed to user data' });
    }
  }

  async getUserInfo(username: string, res: any, currUserId): Promise<any> {
    try {
      let user = await this.userModel.findOne({
        username: username,
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username. Please try again.',
        });
      }

      let isProfileOwner = false;

      if (currUserId === user.id) {
        isProfileOwner = true;
      }

      let userInfo = await this.userInfoModel.findOne({
        userId: user._id,
      });

      return res.status(200).json({
        message: 'User data fetched successfully!',
        userInfo,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(400).json({ message: 'Failed to user data' });
    }
  }

  async addUserInfo(username: string, body, res: any, currUserId) {
    try {
      let user = await this.userModel.findOne({
        username: username,
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username. Please try again.',
        });
      }

      let isProfileOwner = false;

      if (currUserId === user.id) {
        isProfileOwner = true;
      }

      console.log(body);

      const newValue = this.sanitizeValueToNull(body.value);

      switch (body.infoType) {
        case 'Location':
          await this.userInfoModel.updateOne({
            $set: { currLocation: newValue },
          });
          break;
        case 'Graduation':
          await this.userInfoModel.updateOne({
            $set: { studied: newValue },
          });
          break;
        case 'Job':
          await this.userInfoModel.updateOne({
            $set: { worksIn: newValue },
          });
          break;
        case 'Relationship':
          await this.userInfoModel.updateOne({
            $set: { relationship: newValue },
          });
          break;
        case 'Phone':
          await this.userInfoModel.updateOne({
            $set: { phoneNumber: newValue },
          });
          break;
      }

      return res.status(200).json({
        message: 'User data fetched successfully!',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(400).json({ message: 'Failed to user data' });
    }
  }

  sanitizeValueToNull(value: string) {
    return value == '' ? null : value;
  }
}
