import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdlistService } from './adlist.service';
import { ConstructComponent } from './construct/construct.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {UserRegService} from './user-reg.service';


@NgModule({
  declarations: [
    AppComponent,
    DiaryListComponent,
    MainPageComponent,
    ConstructComponent,
    RegistrationComponent,
    LoginFormComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AdlistService, UserRegService],
  bootstrap: [AppComponent]
})
export class AppModule { }
