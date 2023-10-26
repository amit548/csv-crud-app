import { Component, EventEmitter, Input, Output } from '@angular/core';

import User from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  @Input() user?: User;
  @Output() updateUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  update() {
    this.updateUser.emit(this.user);
  }

  onResetUser() {
    this.user = undefined;
  }

  onDeleteUser() {
    this.deleteUser.emit(this.user);
    this.onResetUser();
  }
}
