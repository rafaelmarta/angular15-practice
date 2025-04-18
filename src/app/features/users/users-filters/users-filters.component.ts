import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss']
})
export class UsersFiltersComponent implements OnInit {
  @Input() searchText = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() addUser = new EventEmitter<void>();
  
  selectedStatus = 'all';
  isSearching = false;
  
  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.isSearching = false;
      this.searchTextChange.emit(searchTerm);
    });
  }
  
  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.isSearching = true;
    this.searchText = value;
    this.searchSubject.next(value);
  }
  
  onStatusChange(status: string) {
    this.statusChange.emit(status);
  }
}