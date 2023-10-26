import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';

import User from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  isCreateUserClicked = false;
  userModel: User = new User();

  isError = false;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userModel.age = 18;
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .subscribe((users) => (this.users = users.data?.users || []));
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  createUser(): void {
    this.isError = false;
    this.userService
      .createUser(this.userModel)
      .pipe(tap(() => this.getUsers()))
      .subscribe({
        next: () => (this.userModel = new User()),
        error: (err) => {
          this.isError = true;
          this.errorMessage = err;
        },
      });
  }

  deleteUser(user: User): void {
    if (!user.uid) return;
    this.userService
      .deleteUser(user.uid)
      .pipe(tap(() => this.getUsers()))
      .subscribe();
  }

  updateUser(user: User): void {
    if (!user.uid) return;
    this.userService
      .updateUser(user.uid, user)
      .pipe(tap(() => this.getUsers()))
      .subscribe();
  }
}
