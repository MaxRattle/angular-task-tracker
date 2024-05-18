import { Component } from '@angular/core';

import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewChild, AfterViewInit } from '@angular/core';

import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterLink } from '@angular/router';
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

    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,

    RouterLink,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements AfterViewInit, OnDestroy {
  title: string = 'Список задач';

  displayedColumns: string[] = [
    'header',
    'title',
    'worker',
    'deadline',
    'status',
    'priority',
    'action',
  ];

  dataSource = new MatTableDataSource<Task>();
  private subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TasksService,
    private openCreateTaskDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService.tasks$.subscribe((tasks) => {
        this.dataSource.data = tasks; // Инициализируем данные для таблицы
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // открытия диалогового окна
  createTaskDialog(): void {
    this.openCreateTaskDialog.open(TaskCreateDialogComponent);
  }

  // удаление задачи
  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }

  // редактирование задачи
  editTaskDialog(task: Task): void {
    this.openCreateTaskDialog.open(TaskCreateDialogComponent, {
      data: task,
    });
  }
}
