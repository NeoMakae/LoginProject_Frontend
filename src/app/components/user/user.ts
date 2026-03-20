import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Auth } from '../../services/auth';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class User {
  @Input() email: string = ''; // email of logged-in user
  @Output() logout = new EventEmitter<void>();

  user: UserModel | null = null;
  loading = true;

  constructor(private authService: Auth) {}

  ngOnInit() {
    if (this.email) {
      this.authService.getUserDetails(this.email).subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
        error: () => {
          this.user = null;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  onLogout() {
    this.user = null;
    this.logout.emit(); // let parent component show home again
  }
}