import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PointOfViewComponent } from './retro/point-of-view/point-of-view.component';
import { RetroBoardComponent } from './retro/retro-board/retro-board.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PostItHiddenComponent } from './retro/post-it/post-it-hidden/post-it-hidden.component';
import { PostItOnBoardComponent } from './retro/post-it/post-it-on-board/post-it-on-board.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { RetroComponent } from './retro/retro.component';

@NgModule({
  declarations: [
    AppComponent,
    PointOfViewComponent,
    RetroBoardComponent,
    PostItHiddenComponent,
    PostItOnBoardComponent,
    LoginComponent,
    RetroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
