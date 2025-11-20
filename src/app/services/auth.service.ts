import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, user => this.currentUser = user);
  }

  async ensureSignedIn(): Promise<User | null> {
    if (this.auth.currentUser) return this.auth.currentUser;
    const cred = await signInAnonymously(this.auth);
    return cred.user;
  }

  getUid() {
    return this.auth.currentUser?.uid ?? null;
  }
}
