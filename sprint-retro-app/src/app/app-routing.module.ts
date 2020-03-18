import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewBoardComponent } from './board/view-board/view-board.component';
import { ConfigComponent } from './config/config.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { WriteBoardComponent } from './board/write-board/write-board.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './user/login/user.service';

const routes: Routes = [
  {
    path: 'write',
    component: WriteBoardComponent,
    canActivate: [UserService],
  },
  {
    path: 'view',
    component: ViewBoardComponent,
    canActivate: [UserService]
  },
  {
    path: 'config',
    component: ConfigComponent,
    canActivate: [UserService]
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [UserService]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
