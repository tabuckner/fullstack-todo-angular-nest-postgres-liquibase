import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoModel } from '../models/to-do.model';
import { ToDoDto } from '../models/to-do.dto';

const BE_PORT = 3000; // Hardcoded for now.

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly hostname = 'http://localhost';
  private readonly backendPort = BE_PORT;
  private readonly baseUrl = 'api/v1';
  private readonly route = 'todos';
  private readonly toDosEndpoint = `${this.hostname}:${this.backendPort}/${this.baseUrl}/${this.route}`;

  constructor(
    private http: HttpClient
  ) { }

  public getToDos(): Observable<Array<ToDoModel>> {
    const url = this.toDosEndpoint;
    return this.http.get<Array<ToDoModel>>(url);
  }

  public addToDo(nextToDo: ToDoDto): Observable<any> {
    const url = this.toDosEndpoint;
    return this.http.post(url, { ...nextToDo });
  }

  public removeToDo(id: number): Observable<any> {
    const url = `${this.toDosEndpoint}/${id}`;
    return this.http.delete(url);
  }
}
