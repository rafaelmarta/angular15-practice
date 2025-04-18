import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UsersPageComponent } from './features/users/users-page/users-page.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => 
      import('./features/users/users.module').then(m => m.UsersModule),
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
  // { path: '', component: UsersPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
