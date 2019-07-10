import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB: string = 'http://192.168.2.113:3000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.URL_DB + "/tasks");
  }

  saveTask(task: Task): Observable<any>{
    return this.http.post(this.URL_DB + "/task", task);
  }

  deleteTask(task: Task): void {
    let params = new HttpParams().set('_id', task._id);
    this.http.delete(this.URL_DB + "/task", { params: params }).subscribe(t => {
      console.log(t);
    });
  }

  updateTask(task: Task): void {
    this.http.patch(this.URL_DB+"/task", task).subscribe(t => {
      console.log(t);
    })
  }

  getTaskByName(name: string): Observable<Task>{
    return this.http.get<Task>(this.URL_DB+"/task/"+name);
  }
}
