import { IUser } from 'src/app/shared/user/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private STORAGE_KEY = 'app_users';
  private usersSubject = new BehaviorSubject<IUser[]>(this.getUsers())
  public users$: Observable<IUser[]> = this.usersSubject.asObservable();

  constructor() { console.log('test')}

  private getUsers(): IUser[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  private storeUsers(users: IUser[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  addUser(user: IUser) {
    const users = [...this.usersSubject.value, user];
    this.storeUsers(users);
    this.usersSubject.next(users);
  }

  updateUser(email: string, changes: Partial<IUser>): void {
    const users = this.usersSubject.value.map(user =>
       user.email === email 
        ? { ...user, ...changes } 
        : user 
      );

      this.storeUsers(users);
      this.usersSubject.next(users);
  }

  deleteUser(email: string): void {
    const users = this.usersSubject.value.filter(user => user.email !== email);
    this.storeUsers(users);
    this.usersSubject.next(users);
  }
}
