import { Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';

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
  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  // формы
  formDialog: FormGroup;
  constructor(private _fb: FormBuilder, private taskService: TasksService) {
    this.formDialog = this._fb.group({
      header: '',
      title: '',
      worker: '',
      deadline: '',
      status: '',
      priority: '',
    });
  }
  // отправка формы
  onFormSubmit() {
    if (this.formDialog.valid) {
      this.taskService.addTask(this.formDialog.value);
    }
  }
}
