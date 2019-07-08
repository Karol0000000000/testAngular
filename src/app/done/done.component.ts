import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks';
import { Task } from '../models/task';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskList().subscribe(t => 
      {
        this.tasksDone = t.filter(t => t.isDone === true);
      });
  }

  tasksDone: Array<Task> = [];

  ngOnInit() {
  }

}
