import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RetroComponent } from './retro/retro.component';
import { ViewBoardComponent } from './view-board/view-board.component';
import { ConfigComponent } from './config/config.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

const routes: Routes = [
  { path: 'retro', component: RetroComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'admin', component: AdminViewComponent },
  { path: '', component: ViewBoardComponent },
  { path: '**', component: RetroComponent },
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
