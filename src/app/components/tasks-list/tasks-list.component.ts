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

import { Table } from '../../interfaces/table';
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
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  title: string = 'Список задач';

  displayedColumns: string[] = [
    'header',
    'title',
    'worker',
    'deadline',
    'status',
    'priority',
    'id',
  ];

  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TasksService,
    private _openCreateTaskDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  // редактирование задачи
  openEditTaskDialog() {}
}
