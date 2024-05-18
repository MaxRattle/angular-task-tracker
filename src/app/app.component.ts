import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UpperCasePipe,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Мини таск-трекер';
}
