import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewBoardComponent } from './view/view-board/view-board.component';
import { ViewConfigComponent } from './view/view-config/view-config.component';
import { ViewAdminComponent } from './view/view-admin/view-admin.component';
import { WriteBoardComponent } from './view/write-board/write-board.component';
import { LoginComponent } from './view/view-login/login.component';
import { UserService } from './service/user/user.service';

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
    component: ViewConfigComponent,
    canActivate: [UserService]
  },
  {
    path: 'admin',
    component: ViewAdminComponent,
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
