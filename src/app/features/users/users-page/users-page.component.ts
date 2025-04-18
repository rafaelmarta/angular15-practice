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
  users: IUser[] = []
  filterText = '';
  companyOptions = [];
  languageOptions = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private dialogService: NbDialogService,
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    this.subscription = this.usersService.users$.subscribe(users => {
      this.users = users;
    })

    if (this.users.length === 0) {
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
} 
