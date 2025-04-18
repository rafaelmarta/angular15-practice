import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitUser = new EventEmitter();
}
