import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  standalone: true,
  selector: 'app-room',
  imports: [CommonModule],
  templateUrl: './room.html',
  styleUrls: ['./room.scss'],
})
export class Room implements OnInit {
  route = inject(ActivatedRoute);
  firestore = inject(Firestore);
  auth = inject(Auth);

  roomId = signal<string>('');
  roomData = signal<any>(null);
  isHost = signal<boolean>(false);
  copied = signal<boolean>(false);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.roomId.set(this.route.snapshot.paramMap.get('id') || '');
    const uid = this.auth.currentUser?.uid;

    const roomRef = doc(this.firestore, 'rooms', this.roomId());

    onSnapshot(roomRef, (snap) => {
      console.log('onSnapshot', roomRef);
      console.log('snap', snap);

      const data = snap.data();
      this.roomData.set(data);
      console.log('after setting roomData', this.roomData());

      if (data) {
        this.isHost.set(uid === data['hostUid']);
      }

      this.loading.set(false);
    });
  }

  async copyCode() {
    await navigator.clipboard.writeText(this.roomId());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1200);
  }

  async updateRoundTime(time: string | number) {
    time = Number(time);
    if (!this.isHost()) return;

    const roomRef = doc(this.firestore, 'rooms', this.roomId());
    await updateDoc(roomRef, {
      'settings.roundTime': time,
    });
  }

  async startGame() {
    if (!this.isHost()) return;

    const roomRef = doc(this.firestore, 'rooms', this.roomId());
    await updateDoc(roomRef, { status: 'playing' });
  }
}
