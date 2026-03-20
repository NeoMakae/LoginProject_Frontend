import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Auth, LoginResponse, User } from '../../services/auth';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  user: User | null = null;
  error: string = '';
  message: '' | 'invalid' | 'user' | 'success' = '';

  @Output() back = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<string>();
  @Output() loginSuccess = new EventEmitter<User>();

  constructor(private authService: Auth) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res: LoginResponse) => {
        if (res.message === 'Login successful!' && res.user) {
          this.user = res.user;
          this.loginSuccess.emit(this.user);     
          this.pageChange.emit('userDetails');   
        } else {
          this.pageChange.emit('invalid');
          this.message = 'invalid';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.message = 'invalid';
      },
    });
  }

}