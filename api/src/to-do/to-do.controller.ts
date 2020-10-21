import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ToDoModel } from './models/to-do.model';
import { ToDoService } from './to-do.service';
import { ToDoDto } from './models/to-do.dto';

@Controller('todos')
export class ToDoController {

  constructor(private toDos: ToDoService) {}
  
  @Get()
  public async getToDos(): Promise<Array<ToDoModel>> {
    return this.toDos.getToDoItems();
  }

  @Post()
  public async createToDo(@Body() nextToDoItem: ToDoDto): Promise<any> {
    return this.toDos.addToDoItem(nextToDoItem);
  }

  @Get(':id')
  public async getToDo(@Param('id') id): Promise<Array<ToDoModel>> {
    return this.toDos.getToDoItem(id);
  }

  @Put(':id')
  public async putToDo(@Param('id') id, @Body() nextToDoItem: ToDoDto): Promise<void> {
    return this.toDos.updateToDoItem(id, nextToDoItem);
  }

  @Delete(':id')
  public async deleteToDo(@Param('id') id): Promise<void> {
    return this.toDos.removeToDoItem(id);
  }
}
