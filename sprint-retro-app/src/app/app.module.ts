import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostItHiddenComponent } from './scene/write-board-scene/post-it-hidden/post-it-hidden.component';
import { PostItOnBoardComponent } from './scene/view-board-scene/post-it-on-board/post-it-on-board.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginSceneComponent } from './scene/login-scene/login-scene.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { ViewBoardSceneComponent } from './scene/view-board-scene/view-board-scene.component';
import { ConfigSceneComponent } from './scene/config-scene/config-scene.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LinkComponent } from './scene/view-board-scene/link/link.component';
import { AdminSceneComponent } from './scene/admin-scene/admin-scene.component';
import { WriteBoardSceneComponent } from './scene/write-board-scene/write-board-scene.component';
import { ThemeFormComponent } from './scene/admin-scene/theme-form/theme-form.component';
import { BoardsFormComponent } from './scene/admin-scene/boards-form/boards-form.component';
import { ExportBoardsComponent } from './scene/view-board-scene/export-boards/export-boards.component';

@NgModule({
  declarations: [
    AppComponent,
    PostItHiddenComponent,
    PostItOnBoardComponent,
    LoginSceneComponent,
    NavigationComponent,
    ViewBoardSceneComponent,
    ConfigSceneComponent,
    LinkComponent,
    AdminSceneComponent,
    WriteBoardSceneComponent,
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
