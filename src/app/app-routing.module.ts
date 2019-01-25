import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { NumberRuffleComponent } from './pages/number-ruffle/number-ruffle.component';
import { RuffleListComponent } from './pages/ruffle-list/ruffle-list.component';
import { RuffleItemComponent } from './pages/ruffle-list/ruffle-item/ruffle-item.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'rufflelist', component: RuffleListComponent,
    children: [
      {path: ':rufflename', component: RuffleItemComponent}
    ]
  },
  { path: 'numberruffle', component: NumberRuffleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
