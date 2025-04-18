import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { IUser } from 'src/app/shared/user/user.model';
import { generateMockUsers } from 'src/app/shared/user/users.mock';
import { UsersModalComponent } from '../users-modal/users-modal.component';
import { UsersService } from '../users.service';

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

  constructor(
    private dialogService: NbDialogService,
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const newUsers = generateMockUsers(5);
    this.users = [...this.users, ...newUsers]
  }

  openUserModal(): void {
    this.dialogService.open(UsersModalComponent, {
      context: {},
      hasScroll: true,
      closeOnBackdropClick: true,
    }).onClose.subscribe(result => {
      if (result) this.usersService.addUser(result)
    })
  }
} 
