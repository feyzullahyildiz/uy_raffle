import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruffle-item',
  templateUrl: './ruffle-item.component.html',
  styleUrls: ['./ruffle-item.component.scss']
})
export class RuffleItemComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }
  ruffleItem
  users
  @ViewChild('username') userNameElement: ElementRef;
  @ViewChild('userno') userNoElement: ElementRef;
  ngOnInit() {
    this.activatedRoute.params.subscribe(ruffleItem => {
      this.ruffleItem = ruffleItem.rufflename
      this.getUsers()
    })
  }
  addUser(){
    const name = this.userNameElement.nativeElement.value
    const no = this.userNoElement.nativeElement.value
    console.log('name', name, no)
    this.users = [...this.users, {name, no}]
    localStorage.setItem(this.ruffleItem, JSON.stringify(this.users))
  }

  getUsers(){
    const arr = localStorage.getItem(this.ruffleItem)
    let json
    try {
      json = JSON.parse(arr)
      if(json instanceof Array){
        this.users = json
      }else{
        console.error('json verisi farklı geliyor', json)
        throw new Error('json verisi farklı geliyor')
      }
    } catch (error) {
      json = []
    }
    this.users = json
    console.log(json)
    return this.users
  }

}
