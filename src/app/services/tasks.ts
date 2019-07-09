import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';

@Injectable()
export class TasksService {

    private taskListObs = new BehaviorSubject<Array<Task>>([]);

    constructor(private httpService: HttpService) {
        this.httpService.getTasks().subscribe(tasks => this.taskListObs.next(tasks));
    }

    add(t: Task) {
        const list = this.taskListObs.getValue();
        list.push(t);
        this.taskListObs.next(list);
        this.saveTaskInDb(t);

    }

    remove(t: Task) {
        const list = this.taskListObs.getValue().filter(x => x !== t);
        this.httpService.deleteTask(t);
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

    saveTaskInDb(t: Task){
        this.httpService.saveTask(t).subscribe(t1 => {
            this.httpService.getTaskByName(t.name).subscribe((t2: Task) => {
                let oldValues = this.taskListObs.getValue();
                let newTab = oldValues.filter(z => z.name !== t2.name);
                newTab.push(t2);
                this.taskListObs.next(newTab);
            });
        });
    }

    updateTaskInDb(t: Task){
        this.httpService.updateTask(t);
    }
}