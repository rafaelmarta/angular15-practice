import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, Subject } from 'rxjs';
import { IUser } from 'src/app/shared/user/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {
  @Input() users: IUser[] = [];
  @Output() actionClick = new EventEmitter<{ email: string, action: string }>();
  @Output() loadMoreUsers = new EventEmitter<void>();

  expandedRows: boolean[] = [];
  private destroy$ = new Subject<void>();

  contextMenuTag = 'users-table-context-menu';
  
  actions = [
    { title: 'Ativar', data: { action: 'activate' } },
    { title: 'Desativar', data: { action: 'deactivate' } },
    { title: 'Editar', data: { action: 'edit' }},
    { title: 'Excluir', data: { action: 'delete' }}
  ]

  constructor(private nbMenuService: NbMenuService){}

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) =>
          !!(tag && (tag as string).startsWith('users-table-context-menu|'))
        )
      )
      .subscribe(event => {      
        const email = event.tag.split('|')[1];
        const action = event.item.data?.action;
        
        if (email && action) {
          this.actionClick.emit({ email, action });
        }
      });
  }

  getUserMenuTag(email: string): string {
    return `users-table-context-menu|${email}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScroll(): void {
    this.loadMoreUsers.emit();
  };


  mapStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      active: 'Ativo',
      inactive: 'Inativo',
      pending: 'Pendente'
    };
    return statusMap[status] || status;
  }

  toggleExpand(index: number): void {
    this.expandedRows[index] = !this.expandedRows[index]
  }

  avatarInitials(user: IUser): string {
    const nameInitial = user.name ? user.name.charAt(0).toUpperCase() : '';
    const lastnameInitial = user.lastname ? user.lastname.charAt(0).toUpperCase() : '';
    return nameInitial + lastnameInitial
  }
}
