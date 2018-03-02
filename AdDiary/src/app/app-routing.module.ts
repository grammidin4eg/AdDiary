import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiaryListComponent }   from './diary-list/diary-list.component';
import { MainPageComponent }      from './main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'diary/:id', component: DiaryListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}