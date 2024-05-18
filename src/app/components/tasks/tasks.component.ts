import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';
import { OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const taskId = +idParam;
        const task = this.tasksService.getTaskById(taskId);
        if (task !== undefined) {
          this.task = task;
        } else {
          console.error('Task not found');
          // Обработка случая, когда задача не найдена
        }
      } else {
        console.error('Task ID is null');
      }
    });
  }
}
