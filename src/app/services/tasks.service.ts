import { Injectable } from '@angular/core';

import { Task } from '../interfaces/task';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    } else {
      this.tasks = [
        {
          header: 'Разработка',
          title: 'Мини таск трекер',
          worker: 'Максим Сушков',
          deadline: new Date(2024, 4, 18),
          status: Status.New,
          priority: Priority.High,
          id: this.generateUniqueId(),
        },
      ];
      this.saveTasks();
    }
    this.tasksSubject.next(this.tasks);
  }

  get tasks$() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.generateUniqueId(); // Генерация ID для новой задачи
    this.tasks.push(task);
    this.saveTasks();
  }

  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = task;
      this.saveTasks();
    }
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.tasksSubject.next(this.tasks); // Обновление потока после каждого изменения
  }

  private generateUniqueId(): number {
    let uniqueId: number;
    do {
      uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    } while (this.tasks.some((task) => task.id === uniqueId));
    return uniqueId;
  }
}
