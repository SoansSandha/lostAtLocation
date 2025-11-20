import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
name = '';

  constructor(private router: Router) {}

  generateRoomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
    }
    return code;
  }

  createRoom() {
    if (!this.name.trim()) return;

    const code = this.generateRoomCode();

    // later we will save to Firestore here.
    this.router.navigate(['/room', code], {
      state: { playerName: this.name, host: true },
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
