import { Component } from '@angular/core';

import { UpperCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../interfaces/task';
import { Status } from '../../enums/status';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    UpperCasePipe,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements AfterViewInit {
  title: string = 'Список задач';
  statuses = [
    { status: Status.New },
    { status: Status.InProgress },
    { status: Status.Completed },
  ];
  testTask: Task[] = [
    {
      title: 'Test',
      worker: 'Andrey',
      deadline: new Date(),
      status: Status.New,
      id: '1',
    },
    {
      title: 'Test1',
      worker: 'Maxim',
      deadline: new Date(),
      status: Status.New,
      id: '2',
    },
    {
      title: 'Test2',
      worker: 'Boris',
      deadline: new Date(),
      status: Status.InProgress,
      id: '3',
    },
  ];

  displayedColumns: string[] = ['title', 'worker', 'deadline', 'status', 'id'];
  dataSource = new MatTableDataSource(this.testTask);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
