// import { HttpClientModule } from '@angular/common/http';
import { Howl } from 'howler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { MusiclistComponent } from './musiclist/musiclist.component';

@NgModule({
  declarations: [
    AppComponent,
    MusiclistComponent,

    // HttpClientModule

  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
