import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToDoDto } from '../models/to-do.dto';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  public description = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<NewTodoComponent>,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onSubmit() {
    const nextToDo: ToDoDto = {
      description: this.description.value
    };
    this.api.addToDo(nextToDo).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
