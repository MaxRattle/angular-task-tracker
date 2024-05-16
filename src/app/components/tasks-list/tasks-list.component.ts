import { Component } from '@angular/core';

import { Task } from '../../interfaces/task';
import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';

import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import { DialogComponent } from '../dialog/dialog.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    MatDialogModule,
    DialogComponent,
    MatButtonModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  title: string = 'Список задач';

  testTask: Task[] = [
    {
      title: 'Пример',
      worker: 'Андрей',
      deadline: new Date(),
      status: Status.New,
      priority: Priority.Middle,
    },
    {
      title: 'Пример номер 2',
      worker: 'Максим',
      deadline: new Date(1),
      status: Status.InProgress,
      priority: Priority.High,
    },
  ];

  // добавление задачи
  constructor(private _dialog: MatDialog) {}

  openDialog() {
    this._dialog.open(DialogComponent);
  }
}
