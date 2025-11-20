import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-create',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  firestore = inject(Firestore);
  router = inject(Router);
  auth = inject(Auth);

  name = '';

  async createRoom() {
    const user = this.auth.currentUser;
    if (!user) return;

    const roomId = this.generateRoomCode();
    const roomRef = doc(this.firestore, 'rooms', roomId);

    const roomData = {
      hostUid: user.uid,
      members: [{ uid: user.uid, name: this.name }],
      settings: { roundTime: 5 },
      status: 'lobby',
    };

    try {
      await setDoc(roomRef, roomData);
      console.log('Room created:', roomId);
      this.router.navigate(['/room', roomId]);
    } catch (err) {
      console.error('Error creating room:', err);
    }
  }

  generateRoomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) code += letters[Math.floor(Math.random() * letters.length)];
    return code;
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
