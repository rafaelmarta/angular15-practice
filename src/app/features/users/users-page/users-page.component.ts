import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/user/user.model';
import { generateMockUsers } from 'src/app/shared/user/users.mock';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: IUser[] = []
  filterText = '';
  companyOptions = [];
  languageOptions = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const newUsers = generateMockUsers(25);
    this.users = [...this.users, ...newUsers]
  }
} 
