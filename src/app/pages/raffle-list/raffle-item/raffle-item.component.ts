import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raffle-item',
  templateUrl: './raffle-item.component.html',
  styleUrls: ['./raffle-item.component.scss']
})
export class RaffleItemComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }
  raffleItem
  users: Array<any>
  editMode = false
  raffleCount = 1
  isRaffleStarted;
  @ViewChild('username') userNameElement: ElementRef;
  @ViewChild('userno') userNoElement: ElementRef;
  ngOnInit() {
    this.activatedRoute.params.subscribe(raffleItem => {
      this.raffleItem = raffleItem.rafflename
      this.getUsers()
      this.isRaffleStarted = false
    })
  }
  addUser(){
    const name = this.userNameElement.nativeElement.value
    const no = this.userNoElement.nativeElement.value
    if(no && name){
      if(this.users.find(user => user.no === no) === undefined){
        this.users = [...this.users, {name, no}]
        localStorage.setItem(this.raffleItem, JSON.stringify(this.users))
      }else{
        alert('Aynı karne numaralı kişi zaten girildi.')
      }
    }else{
      alert('Karne numarası veya isim bulunamadı')
    }
  }

  getUsers(){
    const arr = localStorage.getItem(this.raffleItem)
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
    return this.users
  }
  onEditMode(){
    this.editMode = !this.editMode
  }
  deleteItem(user: any){
    const index = this.users.indexOf(user)
    if(index !== -1){
      if(window.confirm('Kullanıcı Siliniyor')){
        this.users.splice(index, 1)
        localStorage.setItem(this.raffleItem, JSON.stringify(this.users))
      }
    }else{
      alert('Katılımcı bulanamadı')
    }
  }
  raffleCountChange(event: any){
    const value = +event.target.value
    // console.log('here', value)
    if(value >= this.users.length && this.users.length > 1){
      this.raffleCount = this.users.length -1
      console.log('degisti', this.raffleCount)
    }else if(value < 1){
      this.raffleCount = 1;
    }
  }
  startRaffle(){
    this.isRaffleStarted = true;
  }
}
