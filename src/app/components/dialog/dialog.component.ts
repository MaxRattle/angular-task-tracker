import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogComponent {
  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  // формы
  formDialog: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.formDialog = this._fb.group({
      header: '',
      title: '',
      worker: '',
      deadline: '',
      status: '',
      priority: '',
    });
  }
  onFormSubmit() {
    if (this.formDialog.valid) {
      console.log(this.formDialog.value);
    }
  }

  // закрыть dialog
  // constructor(private _dialog: MatDialog) {}

  // closeDialog() {
  //   this._dialog.close();
  // }
}
