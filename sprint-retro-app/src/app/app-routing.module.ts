import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewBoardSceneComponent } from './scene/view-board-scene/view-board-scene.component';
import { ConfigSceneComponent } from './scene/config-scene/config-scene.component';
import { AdminSceneComponent } from './scene/admin-scene/admin-scene.component';
import { WriteBoardSceneComponent } from './scene/write-board-scene/write-board-scene.component';
import { LoginSceneComponent } from './scene/login-scene/login-scene.component';
import { UserService } from './service/user/user.service';

const routes: Routes = [
  {
    path: 'write',
    component: WriteBoardSceneComponent,
    canActivate: [UserService],
  },
  {
    path: 'view',
    component: ViewBoardSceneComponent,
    canActivate: [UserService]
  },
  {
    path: 'config',
    component: ConfigSceneComponent,
    canActivate: [UserService]
  },
  {
    path: 'admin',
    component: AdminSceneComponent,
    canActivate: [UserService]
  },
  { path: '', component: LoginSceneComponent },
  { path: '**', component: LoginSceneComponent },
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
