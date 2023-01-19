import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = taskService.getTasks();
  }

  deleteTask(index: number) {
    this.tasks = this.taskService.deleteTask(index);
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    // this.tasks = this.taskService.updateTaskReminder(task);
  }

  addTask(task: Task) {
    console.log(task);
  }
}
