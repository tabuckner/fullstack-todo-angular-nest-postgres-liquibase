import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ToDoController],
  providers: [ToDoService]
})
export class ToDoModule {}
