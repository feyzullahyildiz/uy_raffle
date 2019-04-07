import { Component, OnInit } from '@angular/core';
import { getSeatList, calculateSeatList } from '../seat-data';

@Component({
  selector: 'app-number-raffle',
  templateUrl: './number-raffle.component.html',
  styleUrls: ['./number-raffle.component.scss']
})
export class NumberRaffleComponent implements OnInit {
  constructor() { }
  seatList = getSeatList();
  originList: string[];
  list: string[];
  winnerList: string[];
  message: string;
  ngOnInit() {
    this.originList = calculateSeatList();
    this.list = this.originList.concat();
    this.winnerList = [];

    this.message = `Toplam Koltuk Sayısı: ${this.originList.length}`
  }
  raffle() {
    const len = this.list.length;
    const index = Math.ceil(Math.random() * len) - 1;
    const value = this.list[index];
    this.winnerList.unshift(value);
    console.log('LAST WINNER', value);

  }

}
