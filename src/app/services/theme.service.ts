import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    // Load saved theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') this.setDarkMode();
    else this.setLightMode();
  }

  toggleTheme() {
    if (this.currentTheme === 'light') {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }

  setDarkMode() {
    this.currentTheme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  setLightMode() {
    this.currentTheme = 'light';
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  get theme() {
    return this.currentTheme;
  }
}
