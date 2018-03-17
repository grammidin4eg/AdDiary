import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdlistService } from './adlist.service';
import { ConstructComponent } from './construct/construct.component'


@NgModule({
  declarations: [
    AppComponent,
    DiaryListComponent,
    MainPageComponent,
    ConstructComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AdlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
