import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PointOfViewComponent } from './point-of-view/point-of-view.component';
import { RetroBoardComponent } from './retro-board/retro-board.component';
import { PostItComponent } from './post-it/post-it.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DrawerBoardComponent } from './retro-board/drawer-board/drawer-board.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    PointOfViewComponent,
    RetroBoardComponent,
    PostItComponent,
    DrawerBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
