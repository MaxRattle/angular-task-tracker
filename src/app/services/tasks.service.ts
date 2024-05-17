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
      this.tasks = [];
      // данные о задачах по умолчанию
      const defaultTasks = [
        {
          header: 'Заголовок первой задачи',
          title: 'Пример',
          worker: 'Андрей',
          deadline: new Date(),
          status: Status.New,
          priority: Priority.Middle,
          id: this.generateUniqueId(),
        },
        {
          header: 'Заголовок второй задачи',
          title: 'Пример номер 2',
          worker: 'Максим',
          deadline: new Date(1),
          status: Status.InProgress,
          priority: Priority.High,
          id: this.generateUniqueId(),
        },
      ];
      // generateUniqueId для каждой задачи при начальной загрузке и добавляем их в this.tasks
      for (const task of defaultTasks) {
        const taskWithId = {
          ...task,
          id: this.generateUniqueId(),
        };
        this.tasks.push(taskWithId);
      }
      // сохранение задач в localStorage
      this.saveTasks();
    }
  }

  // генерация ID для задач
  private generateUniqueId(): number {
    let uniqueId: number;
    let isUnique: boolean;
    do {
      uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      isUnique = !this.tasks.some((task) => task.id === uniqueId);
    } while (!isUnique);
    return uniqueId;
  }

  // управление данными о задачах
  getTasks(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    const newTaskWithId = {
      ...task,
      id: this.generateUniqueId(), // генерация и добавление уникального ID
    };
    this.tasks.push(newTaskWithId);
    this.saveTasks();
  }
  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }
  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
