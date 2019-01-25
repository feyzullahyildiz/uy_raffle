import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruffle-item',
  templateUrl: './ruffle-item.component.html',
  styleUrls: ['./ruffle-item.component.scss']
})
export class RuffleItemComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(item => {
      console.log('item', item)
    })
  }
  addUser(){
    
  }

}
