import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostItHiddenComponent } from './view/write-board/post-it-hidden/post-it-hidden.component';
import { PostItOnBoardComponent } from './view/view-board/post-it-on-board/post-it-on-board.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './view/view-login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { ViewBoardComponent } from './view/view-board/view-board.component';
import { ViewConfigComponent } from './view/view-config/view-config.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LinkComponent } from './view/view-board/link/link.component';
import { ViewAdminComponent } from './view/view-admin/view-admin.component';
import { WriteBoardComponent } from './view/write-board/write-board.component';
import { ThemeFormComponent } from './view/view-admin/theme-form/theme-form.component';
import { BoardsFormComponent } from './view/view-admin/boards-form/boards-form.component';
import { ExportBoardsComponent } from './view/view-board/export-boards/export-boards.component';

@NgModule({
  declarations: [
    AppComponent,
    PostItHiddenComponent,
    PostItOnBoardComponent,
    LoginComponent,
    NavigationComponent,
    ViewBoardComponent,
    ViewConfigComponent,
    LinkComponent,
    ViewAdminComponent,
    WriteBoardComponent,
    ThemeFormComponent,
    BoardsFormComponent,
    ExportBoardsComponent
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
