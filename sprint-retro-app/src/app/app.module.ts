import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostItHiddenComponent } from './board/write-board/post-it-hidden/post-it-hidden.component';
import { PostItOnBoardComponent } from './board/view-board/post-it-on-board/post-it-on-board.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { ViewBoardComponent } from './board/view-board/view-board.component';
import { ConfigComponent } from './config/config.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LinkComponent } from './board/view-board/link/link.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { WriteBoardComponent } from './board/write-board/write-board.component';
import { ThemeFormComponent } from './admin-view/theme-form/theme-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PostItHiddenComponent,
    PostItOnBoardComponent,
    LoginComponent,
    NavigationComponent,
    ViewBoardComponent,
    ConfigComponent,
    LinkComponent,
    AdminViewComponent,
    WriteBoardComponent,
    ThemeFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000 }),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
