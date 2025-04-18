import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss']
})
export class UsersFiltersComponent {
  @Input() searchText = '';

  @Output() searchTextChange = new EventEmitter<string>();
  @Output() addUser = new EventEmitter<void>();
}
