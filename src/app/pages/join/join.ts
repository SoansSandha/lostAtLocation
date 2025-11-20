import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc, arrayUnion } from '@angular/fire/firestore';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
 firestore = inject(Firestore);
  router = inject(Router);
  auth = inject(Auth);
  route = inject(ActivatedRoute);

  name = '';
  roomCode = '';

  async joinRoom() {
    const user = this.auth.currentUser;
    if (!user) return;

    const roomRef = doc(this.firestore, 'rooms', this.roomCode.toUpperCase());

    const snap = await getDoc(roomRef);
    if (!snap.exists()) {
      alert('Room not found');
      return;
    }

    // Add user to members array if not already there
    await updateDoc(roomRef, {
      members: arrayUnion({ uid: user.uid, name: this.name }),
    });

    // Navigate to the room page
    this.router.navigate(['/room', this.roomCode.toUpperCase()]);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
