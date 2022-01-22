import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { AutoMapper } from 'helpers';
// import { hashPassword } from 'helpers/passwordHelpers';
import { Repository } from 'typeorm/repository/Repository';

import { User } from 'entities/User';
import { BaseError } from 'errors/BaseError';
import { AutoMapper } from 'helpers/AutoMapper';
import { hashPassword } from 'helpers/passwordHelpers';
import { ErrorCode } from 'types/ErrorCode';

import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.findAndCount().then((items) => {
      return items;
    });

    return result[0];
  }

  async get(id: number): Promise<UserDTO | undefined> {
    return this.userRepository.findOne({ id }).then((item) => item && AutoMapper.getViewModel(item, UserDTO));
  }

  async create(data: UserDTO): Promise<UserDTO> {
    const encryptedPass = await hashPassword(data.password);

    return this.userRepository
      .save(
        AutoMapper.getEntity(
          {
            ...data,
            password: encryptedPass,
          },
          User
        )
      )
      .then((result) => AutoMapper.getViewModel(result, UserDTO))
      .catch((err) => {
        switch (err?.errno) {
          case 1062:
            throw new BaseError(ErrorCode.USER_DUPLICATE_EMAIL, { email: data.email });
        }

        throw err;
      });
  }

  async findOneByEmail(email: string): Promise<UserDTO | undefined> {
    return this.userRepository.findOne({ email }).then((item) => item && AutoMapper.getViewModel(item, UserDTO));
  }

  async findOneByUsername(username: string): Promise<UserDTO | undefined> {
    return this.userRepository.findOne({ username }).then((item) => item && AutoMapper.getViewModel(item, UserDTO));
  }
}
