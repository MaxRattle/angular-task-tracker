import { Injectable } from '@angular/core';

import { Task } from '../interfaces/task';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // данные о задачах
  tasks: Task[] = [
    {
      header: 'Заголовок первой задачи',
      title: 'Пример',
      worker: 'Андрей',
      deadline: new Date(),
      status: Status.New,
      priority: Priority.Middle,
    },
    {
      header: 'Заголовок второй задачи',
      title: 'Пример номер 2',
      worker: 'Максим',
      deadline: new Date(1),
      status: Status.InProgress,
      priority: Priority.High,
    },
  ];

  // управление данными о задачах
  getTasks(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    this.tasks.push(task);
  }
}
