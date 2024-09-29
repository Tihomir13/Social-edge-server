import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthenticationService {
  generateRandomSalt(length: number): string {
    return randomBytes(length).toString('hex');
  }
}
