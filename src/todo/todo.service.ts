import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor (
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ){}

  async create (createDto: CreateTodoDto, userId: number) {
    const createTodoDto = this.todoRepository.create(createDto);
    createTodoDto.title = createTodoDto.title;
    createTodoDto.date = new Date().toLocaleString()
    createTodoDto.completed = false;
    createTodoDto.user = await this.userService.findUserById(userId);
    return (await this.todoRepository.save(createTodoDto));
  }

  findAllTodoByUserIdNotCompleted(userId: number) {

    return this.todoRepository.find({relations: ['user'], where:{user: {id:userId}, completed: false},
  });
  }

  findAllTodoByUserIdCompleted(userId: number) {

    return this.todoRepository.find({relations: ['user'], where:{user: {id:userId}, completed: true},
  });
  }

  update(todoid: number) {
    return this.todoRepository.update(todoid, { completed:true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
