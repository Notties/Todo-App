import { Constants } from './../utils/constants';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  
  async create (userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    createdUser.role = Constants.ROLES.NORMAL_ROLE;
    return (await this.userRepository.save(createdUser));
  }

  findUserById(id: number){
    return this.userRepository.findOneOrFail({where: {id:id}});
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({where : {email: email}});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
