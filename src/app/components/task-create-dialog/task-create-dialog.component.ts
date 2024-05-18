import { Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';

import { MatDialogRef } from '@angular/material/dialog';
import { Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../interfaces/task';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class TaskCreateDialogComponent {
  priorities = this.taskService.priorities;
  statuses = this.taskService.statuses;

  // формы
  formDialog: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.formDialog = this.formBuilder.group({
      header: [data?.header, Validators.required],
      title: [data?.title, Validators.required],
      worker: [data?.worker, Validators.required],
      deadline: [data?.deadline, Validators.required],
      status: [data?.status, Validators.required],
      priority: [data?.priority, Validators.required],
      id: [data?.id],
    });
  }
  // отправка формы
  onFormSubmit() {
    if (this.formDialog.valid) {
      if (this.data) {
        this.taskService.updateTask(this.formDialog.value);
      } else {
        this.taskService.addTask(this.formDialog.value);
      }
      this.dialogRef.close();
    }
  }
}
