import { Component, OnInit } from '@angular/core';
import { getSeatList, setSeatList, resetSeatList } from '../seat-data';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  seatList: any;
  constructor() { }

  ngOnInit() {
    this.refreshSeatList();
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
    console.log(seat);
    const value = event.target.valueAsNumber
    seat[1] = value;
  }
}
