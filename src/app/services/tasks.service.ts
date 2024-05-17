import { Injectable } from '@angular/core';

import { Task } from '../interfaces/task';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks!: Task[];
  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    } else {
      // данные о задачах по умолчанию
      this.tasks = [
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
      // сохранение задач в localStorage
      this.saveTasks();
    }
  }

  // управление данными о задачах
  getTasks(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    this.tasks.push(task);
    this.saveTasks();
  }
  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
