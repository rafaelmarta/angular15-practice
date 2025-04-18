import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersFiltersComponent } from './users-filters/users-filters.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersModalComponent } from './users-modal/users-modal.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersFiltersComponent,
    UsersTableComponent,
    UsersModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
