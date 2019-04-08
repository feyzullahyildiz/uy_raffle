import { Component, OnInit } from '@angular/core';
import { getSeatList, setSeatList, resetSeatList, getBackwardCountTime, setBackwardCountTime } from '../seat-data';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  seatList: any;
  backwardTime: number;
  newBackwardTime: number;
  constructor() { }

  ngOnInit() {
    this.refreshSeatList();
    this.backwardTime = getBackwardCountTime();
  }
  refreshSeatList() {
    this.seatList = Object.entries(getSeatList());
  }
  saveSeatConfig() {
    if (window.confirm('Kaydediliyor')) {
      const newObject = {};
      this.seatList.forEach(([key, value]) => {
        newObject[key] = value;
      })
      setSeatList(newObject);
    }
  }
  resetSeatConfig() {
    const res = window.confirm('İlk Ayarlamasına döndürülecektir');
    if (res) {
      resetSeatList();
      this.refreshSeatList();
    }

  }
  seatValueChange(event, seat) {
    const value = event.target.valueAsNumber
    seat[1] = value;
    console.log(seat);
  }
  changeBackwardTime(event) {
    const value = event.target.valueAsNumber;
    this.newBackwardTime = value;
  }
  setBackwardTime() {
    if(window.confirm('Geriye sayım süresi değişecektir')) {
      console.log('degisti');
      setBackwardCountTime(this.newBackwardTime);
    }
  }

}
