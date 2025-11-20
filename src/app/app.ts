import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('lostAtLocation');
   constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.ensureSignedIn();
    console.log('Signed in as', this.authService.getUid());
  }
}
