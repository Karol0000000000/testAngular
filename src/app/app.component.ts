import { Component } from '@angular/core';
import { TasksService } from './services/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TasksService]
})
export class AppComponent {
  title = 'app';
}
