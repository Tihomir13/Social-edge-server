import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../../authentication/schemas/registerUser.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async uploadProfileImage() {}

  async getInitialUserData(username: string, res: any): Promise<any> {
    try {
      let user = await this.userModel.findOne({
        username: username,
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username. Please try again.',
        });
      }

      const userData = {
        name: user.name,
        profileImage: user.profileImage,
        bannerImage: user.bannerImage,
      };

      return res.status(200).json({
        message: 'User data fetched successfully!',
        userData,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(400).json({ message: 'Failed to user data' });
    }
  }
}
