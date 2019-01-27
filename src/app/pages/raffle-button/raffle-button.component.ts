import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-raffle-button',
  templateUrl: './raffle-button.component.html',
  styleUrls: ['./raffle-button.component.scss']
})
export class RaffleButtonComponent implements OnInit {
  @Input() disabled;
  constructor() { }
  ngOnInit() { }
  
}
