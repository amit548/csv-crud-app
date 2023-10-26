import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import User from './user';
import type Resource from './resource';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _baseURI = 'http://localhost:3000';

  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http
      .get<Resource<{ users: User[] }>>(`${this._baseURI}/api/v1/users`)
      .pipe(catchError(this.handleError));
  }

  createUser(user: Omit<User, 'uid' | 'createdAt' | 'updatedAt'>) {
    return this._http
      .post<User>(`${this._baseURI}/api/v1/users`, user, this._httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, user: Omit<User, 'uid' | 'createdAt' | 'updatedAt'>) {
    return this._http
      .patch<User>(
        `${this._baseURI}/api/v1/users/${id}`,
        user,
        this._httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string) {
    return this._http
      .delete<User>(`${this._baseURI}/api/v1/users/${id}`, this._httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        () => 'Something bad happened; please try again later.'
      );
    } else {
      return throwError(() => error.error.message);
    }
  }
}
