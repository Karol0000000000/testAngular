import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable()
export class TasksService {

    private taskListObs = new BehaviorSubject<Array<Task>>([]);

    constructor() {
        const taskList = [
            { name: 'task1', created: new Date().toLocaleString(), isDone: false },
            { name: 'task2', created: new Date().toLocaleString(), isDone: false },
            { name: 'task3', created: new Date().toLocaleString(), isDone: false },
            { name: 'task4', created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true }
        ];
        this.taskListObs.next(taskList);
    }

    add(t: Task) {
        const list = this.taskListObs.getValue();
        list.push(t);
        this.taskListObs.next(list);
    }

    remove(t: Task) {
        const list = this.taskListObs.getValue().filter(x => x !== t);
        this.taskListObs.next(list);
    }

    done(t: Task) {
        t.end = new Date().toLocaleString();
        t.isDone = true;
        const list = this.taskListObs.getValue();
        this.taskListObs.next(list);
    }

    getTaskList(): Observable<Array<Task>> {
        return this.taskListObs.asObservable();
    }
}