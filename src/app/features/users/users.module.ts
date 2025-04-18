import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersFiltersComponent } from './users-filters/users-filters.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { NbLayoutModule, NbCardModule, NbInputModule, NbFormFieldModule, NbOptionModule, NbSelectModule, NbIconModule, NbButtonModule, NbContextMenuModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    UsersPageComponent,
    UsersFiltersComponent,
    UsersTableComponent,
    UsersModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbCardModule,
    NbFormFieldModule,
    NbOptionModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    InfiniteScrollModule,
    NbContextMenuModule,
    NbMenuModule
  ]
})
export class UsersModule { }
