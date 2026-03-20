import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
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

  constructor(private authService: Auth, private cdr: ChangeDetectorRef) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res: LoginResponse) => {
        if (res.message === 'Login successful!' && res.user) {
          this.user = res.user;
          this.loginSuccess.emit(this.user);     
          this.pageChange.emit('userDetails');   
        } 
      },
      error: (err: any) => {
        this.message = 'invalid';
        this.cdr.detectChanges(); //this helped me for cases where angular didn't detect changes on th first click
      },
    });
  }

}