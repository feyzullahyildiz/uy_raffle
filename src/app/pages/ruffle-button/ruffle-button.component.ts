import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ruffle-button',
  templateUrl: './ruffle-button.component.html',
  styleUrls: ['./ruffle-button.component.scss']
})
export class RuffleButtonComponent implements OnInit {
  @Input() disabled;
  constructor() { }
  ngOnInit() { }
  
}
