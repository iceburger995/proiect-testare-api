import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { AutoMapper } from 'helpers';
// import { hashPassword } from 'helpers/passwordHelpers';
import { Repository } from 'typeorm/repository/Repository';

import { User } from 'entities/User';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.findAndCount().then((items) => {
      console.log(items);

      return items;
    });

    console.log(result);

    return result[0];
  }
}
