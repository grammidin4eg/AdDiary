import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiaryListComponent } from './diary-list/diary-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ConstructComponent } from './construct/construct.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/construct', pathMatch: 'full' },
  { path: 'construct', component: ConstructComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'diary/:id', component: DiaryListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
