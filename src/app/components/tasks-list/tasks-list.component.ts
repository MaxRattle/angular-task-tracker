import { Component } from '@angular/core';

import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    MatDialogModule,
    TaskCreateDialogComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  title: string = 'Список задач';

  constructor(
    private taskService: TasksService,
    private _openCreateTaskDialog: MatDialog
  ) {}

  // получения данных о задачах
  tasks: Task[] = this.taskService.getTasks();

  // открытия диалогового окна
  openCreateTaskDialog(): void {
    this._openCreateTaskDialog.open(TaskCreateDialogComponent);
  }

  // удаление задачи
  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.tasks = this.taskService.getTasks();
  }

  // редактирование задачи
  openEditTaskDialog() {}
}
