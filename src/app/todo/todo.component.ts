import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskList().subscribe(t => 
      {
        this.tasksList = t.slice().filter(t => t.isDone === false);
      });
  }

  tasksList: Array<Task> = [];

  ngOnInit() {
  }

  done(t: Task){
    this.tasksService.done(t);
  }

  remove(t: Task){
    this.tasksService.remove(t);
  }

}
