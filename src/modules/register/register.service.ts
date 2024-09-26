import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class RegisterService {
  register(userData: any, res: Response) {
    try {
      console.log(userData);
      
      return res.status(201).json({ message: `User ${userData.username} registered successfully!` });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(400).json({ message: 'Failed to register user. Please try again later.' });
    }
  }
}
