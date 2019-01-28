import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NumberRaffleComponent } from './pages/number-raffle/number-raffle.component';
import { RaffleListComponent } from './pages/raffle-list/raffle-list.component';
import { RaffleItemComponent } from './pages/raffle-list/raffle-item/raffle-item.component';
import { RaffleButtonComponent } from './pages/raffle-button/raffle-button.component';
import { DescriptionComponent } from './pages/description/description.component';
import { EmptyRaffleItemComponent } from './pages/raffle-list/empty-raffle-item/empty-raffle-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RaffleListComponent,
    WelcomeComponent,
    NumberRaffleComponent,
    RaffleItemComponent,
    RaffleButtonComponent,
    DescriptionComponent,
    EmptyRaffleItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
