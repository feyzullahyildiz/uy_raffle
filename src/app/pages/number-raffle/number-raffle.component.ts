import { Component, OnInit, OnDestroy } from '@angular/core';
import { getSeatList, calculateSeatList, getBackwardCountTime, sleeper } from '../seat-data';

@Component({
  selector: 'app-number-raffle',
  templateUrl: './number-raffle.component.html',
  styleUrls: ['./number-raffle.component.scss']
})
export class NumberRaffleComponent implements OnInit, OnDestroy {
  constructor() { }
  destored: boolean;
  seatList;
  originList: string[];
  list: string[];
  winnerList: string[];
  message: string;
  isRaffleStarted: boolean;
  tickStarted: boolean;
  tickValue: number;
  ngOnInit() {
    this.originList = calculateSeatList();
    this.list = this.originList.concat();
    this.winnerList = [];
    this.isRaffleStarted = false;
    this.destored = false;
    this.tickStarted = false;
    this.tickValue = 0;
    this.seatList = getSeatList();
    this.message = `Toplam Koltuk Sayısı: ${this.originList.length}`
  }
  changeRaffle(value: boolean) {
    this.isRaffleStarted = value;
  }
  async startTicking() {
    if (this.tickStarted) {
      return;
    }
    const countTime = getBackwardCountTime();
    this.tickStarted = true;
    for (let i = countTime; i > 0; i--) {
      this.tickValue = i;
      if (this.destored) return;
      await sleeper(800);
      this.tickValue = 0;
      await sleeper(200);
      if (this.destored) return;
    }
    this.tickStarted = false;
    this.raffle();
  }

  raffle() {
    const len = this.list.length;
    const index = Math.ceil(Math.random() * len) - 1;
    const value = this.list[index];
    this.winnerList.unshift(value);
    console.log('LAST WINNER', value);

  }
  ngOnDestroy() {
    this.destored = true;
  }

}
