import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
  name = '';
  roomCode = '';

  constructor(private router: Router) {}

  joinRoom() {
    if (!this.name.trim() || !this.roomCode.trim()) return;

    const code = this.roomCode.toUpperCase();

    // Later we will verify room exists in Firestore.
    this.router.navigate(['/room', code], {
      state: { playerName: this.name, host: false },
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
