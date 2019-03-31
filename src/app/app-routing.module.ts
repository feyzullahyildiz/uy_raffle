import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { NumberRaffleComponent } from './pages/number-raffle/number-raffle.component';
import { RaffleListComponent } from './pages/raffle-list/raffle-list.component';
import { RaffleItemComponent } from './pages/raffle-list/raffle-item/raffle-item.component';
import { EmptyRaffleItemComponent } from './pages/raffle-list/empty-raffle-item/empty-raffle-item.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'rafflelist', component: RaffleListComponent,
    children: [
      { path: '', component: EmptyRaffleItemComponent },
      { path: ':rafflename', component: RaffleItemComponent },
    ]
  },
  { path: 'numberraffle', component: NumberRaffleComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
