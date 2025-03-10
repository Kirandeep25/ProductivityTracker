import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private baseUrl = 'http://localhost:8080/tasks';
  constructor(private http: HttpClient) { }
  getTasks(userid: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${userid}`);
  }

  createTask(userid: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${userid}`, task);
  }

  updateTask(userid: number, taskid: number, task: Task): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${userid}/${taskid}`, task);
  }

  deleteTask(userid: number, taskid: number, options?:any): Observable<any> {
    return this.http.delete<string>(`${this.baseUrl}/${userid}/${taskid}`, options);
  }
}
