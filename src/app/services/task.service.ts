import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { TASKS } from '../mock-tasks';
import { Task } from 'src/app/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {
    this.load();
  }

  private async load() {
    const tasks = await lastValueFrom(
      this.http
        .get<{ tasks: Task[] }>('assets/db.json')
        .pipe(map((data) => data.tasks))
    );

    this.save(tasks);
  }

  private key: string = 'tasks';

  save(tasks: Task[]) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    const item = localStorage.getItem(this.key);
    if (!item) return [];

    return JSON.parse(item) as Task[];
    // return this.http
    //   .get<{ tasks: Task[] }>('assets/db.json')
    //   .pipe(map((data) => data.tasks));
  }

  updateTaskReminder(task: Task) {}

  deleteTask(index: number): Task[] {
    const tasks = this.getTasks();

    if (tasks.length < 1) return tasks;

    tasks.splice(index, 1);

    this.save(tasks);

    return tasks;
    // return this.http
    //   .delete<{ tasks: Task[] }>('assets/db.json')
    //   .pipe(map((data) => data.tasks));
  }

  // addTask(task:Task): {
  //   return this.http.post<{ tasks:Task[] }>('assets/db.json')
  // }
}
