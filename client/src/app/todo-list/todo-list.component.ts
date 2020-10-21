import { Component, OnInit } from '@angular/core';
import { ToDoModel } from '../models/to-do.model';
import { ApiService } from '../services/api.service';
import { ReloadListService } from '../services/reload-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todoListItems: Array<ToDoModel> = [];

  constructor(
    private api: ApiService,
    private reload: ReloadListService,
  ) { }

  ngOnInit() {
    this.api.getToDos().subscribe(todoItems => {
      this.todoListItems = [...todoItems];
    });
    this.reload.reload$.subscribe(() => {
      this.onReloadList();
    });
  }

  public onDeleteItem(event, id: number) {
    event.preventDefault();
    event.stopPropagation();
    this.api.removeToDo(id).subscribe(() => {
      this.onReloadList();
    });
  }

  public onReloadList() {
    this.api.getToDos().subscribe(todoItems => {
      this.todoListItems = [...todoItems];
    });
  }

}
