import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../../authentication/schemas/registerUser.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<UserDocument>,
  ) {}

  async searchProfile(userData: any, res): Promise<any> {
    try {
      const searchedQuery = userData.searchedText;

      console.log(userData);
      const users = await this.userModel.aggregate([
        {
          $match: {
            $or: [
              { username: { $regex: searchedQuery, $options: 'i' } },
              { 'name.firstName': { $regex: searchedQuery, $options: 'i' } },
              { 'name.lastName': { $regex: searchedQuery, $options: 'i' } },
            ],
          },
        },
        {
          $project: {
            username: 1,
            name: { $concat: ['$name.firstName', ' ', '$name.lastName'] },
            profileImage: 1,
          },
        },
        { $limit: 10 },
      ]);

      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'Not Found' });
      }

      const formattedImage = (image) => {
        if (!image || !image.data || !image.contentType) {
          return null;
        }

        return {
          src: `data:${image.contentType};base64,${image.data}`,
          contentType: image.contentType,
        };
      };

      const formattedUsers = users.map((user) => {
        return {
          ...user,
          profileImage: formattedImage(user.profileImage),
        };
      });

      console.log(formattedUsers);
      

      return res.status(200).json({
        message: 'profiles found',
        users: formattedUsers,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Not Found' });
    }
  }
}
