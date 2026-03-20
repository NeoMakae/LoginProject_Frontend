import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Auth, RegisterRequest, RegisterResponse } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  
  // Possible values: '' | 'success' | 'exists' | 'error'
  message: '' | 'success' | 'exists' | 'error' = '';


  @Output() back = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<string>();

  constructor(private authService: Auth, private router: Router) {}

  register() {
  const request: RegisterRequest = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password
  };

  this.authService.register(request).subscribe({
  next: (res: RegisterResponse) => {
    console.log('Registration result:', res.message);
    if (res.message === 'success') {
      this.message = 'success'
        console.log('Here :', this.message);
      this.pageChange.emit('success');
    } else if (res.message === 'exists') {
       this.message = 'exists';
      this.pageChange.emit('exists');
    }
  },
  error: (err: any) => {
    console.error('Registration error:', err);
    this.pageChange.emit('error');
    this.message = 'error';
  }
});
}
}