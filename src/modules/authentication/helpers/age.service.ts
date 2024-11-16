import { Injectable } from '@nestjs/common';

@Injectable()
export class AgeService {
  isUnder16(birthday: { day: number; month: number; year: number }): boolean {
    console.log(birthday);

    const today = new Date();
    const birthDate = new Date(birthday.year, birthday.month - 1, birthday.day);

    let age = today.getFullYear() - birthDate.getFullYear();

    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
      age--;
    }

    return age <= 16;
  }
}
