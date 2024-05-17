import { Component } from '@angular/core';

import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import { DialogComponent } from '../dialog/dialog.component';

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
    DialogComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  title: string = 'Список задач';

  constructor(private taskService: TasksService, private _dialog: MatDialog) {}

  // получения данных о задачах
  tasks: Task[] = this.taskService.getTasks();

  // открытия диалогового окна
  openDialog() {
    this._dialog.open(DialogComponent);
  }
}
