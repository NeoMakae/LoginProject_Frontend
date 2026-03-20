import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { NgIf } from '@angular/common';
import { User } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, Login, Registration],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  currentPage = 'home';
  user: User | null = null;

  showLogin() { this.currentPage = 'login'; }
  showRegister() { this.currentPage = 'register'; }
  showHome() { this.currentPage = 'home'; }
}