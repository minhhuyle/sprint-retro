import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RetroComponent } from './retro/retro.component';

const routes: Routes = [
  { path: 'retro', component: RetroComponent },
  { path: '', component: RetroComponent},
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
