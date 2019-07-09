import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskList().pipe(map(v => {
      return Object.assign(v, { 'isDownloaded': true })
    })).subscribe(t => {
      this.tasksList = t.slice().filter(t => t.isDone === false);
    });
  }

  tasksList: Array<Task> = [];

  ngOnInit() {
  }

  done(t: Task) {
    t.isDone = true;
    this.tasksService.updateTaskInDb(t);
    this.tasksService.done(t);
  }

  remove(t: Task) {
    this.tasksService.remove(t);
  }

  getColor() {
    return this.tasksList.length > 1 ? 'red' : 'green';
  }

  save(t: Task) {
    t.isDownloaded = true;
    this.tasksService.saveTaskInDb(t);
  }

}
