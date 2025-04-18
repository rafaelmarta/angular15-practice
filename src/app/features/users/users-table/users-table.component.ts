import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input() users = [];
  @Input() page = 1;
  @Input() pageSize = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() actionClick = new EventEmitter<void>();
}
