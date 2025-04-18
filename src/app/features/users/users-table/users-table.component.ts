import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/shared/user/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input() users: IUser[] = [];
  @Output() actionClick = new EventEmitter<{ email: string, action: string }>();
  @Output() loadMoreUsers = new EventEmitter<void>();

  expandedRows: boolean[] = [];
  
  actions = [
    { title: 'Ativar', data: { action: 'activate' } },
    { title: 'Desativar', data: { action: 'deactivate' } }
  ]

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
}
