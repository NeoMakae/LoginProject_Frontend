import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  user: User | null;
}

export interface RegisterResponse {
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

register(request: RegisterRequest): Observable<RegisterResponse> {
  return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, request).pipe(
    catchError((error) => {
      // Grab the backend message if it exists
      const msg = error.error?.message || 'error';
      return of({ message: msg }); // return an observable so it goes to 'next'
    })
  );
}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, request)
      .pipe(catchError(this.handleError));
  }

  getUserDetails(email: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/user`, { params: { email } })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else if (error.status) {
      errorMsg = `Error ${error.status}: ${error.error}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}