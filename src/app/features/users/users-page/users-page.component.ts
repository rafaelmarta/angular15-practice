import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { IUser } from 'src/app/shared/user/user.model';
import { generateMockUsers } from 'src/app/shared/user/users.mock';
import { UsersModalComponent } from '../users-modal/users-modal.component';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  allUsers: IUser[] = []
  users: IUser[] = []
  filterText = '';
  filterStatus = 'all';
  private subscription: Subscription = new Subscription();

  constructor(
    private dialogService: NbDialogService,
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    this.subscription = this.usersService.users$.subscribe(users => {
      this.allUsers = users;
      this.applyFilters();
    })

    if (this.allUsers.length === 0) {
      this.loadInitialMockUsers();
    }
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadInitialMockUsers(): void {
    const newUsers = generateMockUsers(5);
    newUsers.forEach(user => this.usersService.addUser(user));
  }

  loadUsers(): void {
    const newUsers = generateMockUsers(5);
    this.users = [...this.users, ...newUsers]
  }

  openUserModal(user?: IUser): void {
    this.dialogService.open(UsersModalComponent, {
      context: {
        user: user
      },
      hasScroll: true,
      closeOnBackdropClick: true,
    }).onClose.subscribe(result => {
      if (result) {
        if (user) {
          this.usersService.updateUser(user.email, result);
        } else {
          this.usersService.addUser(result)
        }
      }
    })
  }

  handleUserAction(event: { email: string, action: string }): void {
    const { email, action } = event;

    switch (action) {
      case 'activate':
          this.usersService.updateUser(email, { status: 'active'});
          break;
      case 'deactivate':
          this.usersService.updateUser(email, { status: 'inactive' });
          break;
      case 'edit':
          { const userToEdit = this.users.find(user => user.email === email);
          if (userToEdit) {
            this.openUserModal(userToEdit)
          }
          break; }
      case 'delete':
          this.usersService.deleteUser(email);
          break;
        default:
            console.log('Ação desconhecida: ', action);
    }
  }

  onSearchTextChange(text: string): void {
    this.filterText = text;
    this.applyFilters();
  }

  onStatusChange(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredUsers = [...this.allUsers];

    if (this.filterText && this.filterText.trim() !== '') {
      const searchText = this.filterText.toLowerCase().trim()
      filteredUsers = filteredUsers.filter(user => {
        return (
          user.name?.toLowerCase().includes(searchText) ||
          user.lastname?.toLowerCase().includes(searchText) ||
          user.email?.toLowerCase().includes(searchText) ||
          (`${user.name} ${user.lastname}`).toLowerCase().includes(searchText)
        )
      });
    }

    if (this.filterStatus !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === this.filterStatus)
    }

    this.users = filteredUsers
  }
} 
