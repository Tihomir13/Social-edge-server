import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  register(userData: any) {
    console.log(userData);
    
    //return `User ${userData.username} registered successfully!`;
  }
}
