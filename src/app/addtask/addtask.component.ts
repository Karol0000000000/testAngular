import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks';
import { Task } from '../models/task';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  constructor(private tasksService: TasksService) {}

  newTask: string;

  ngOnInit() {
  }

  add(){
    const task: Task = (
      {name: this.newTask, 
        created: new Date().toLocaleString(), 
        isDone: false,
        isDownloaded: false
      });
    this.tasksService.add(task);
    this.newTask = '';
  }

}
