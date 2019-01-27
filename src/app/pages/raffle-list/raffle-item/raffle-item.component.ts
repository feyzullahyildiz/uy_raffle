import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRandomNumbers } from '../../../utils';

@Component({
  selector: 'app-raffle-item',
  templateUrl: './raffle-item.component.html',
  styleUrls: ['./raffle-item.component.scss']
})
export class RaffleItemComponent implements OnInit {
  @ViewChild('raffleCountLeftElement') raffleCountLeftElement: ElementRef;
  constructor(public activatedRoute: ActivatedRoute) { }
  raffleItem
  users: Array<any>
  editMode = false
  raffleCount = 1
  isRaffleStarted;
  raffleCountLeft = 0;
  usersClone
  winnerList
  @ViewChild('username') userNameElement: ElementRef;
  @ViewChild('userno') userNoElement: ElementRef;
  ngOnInit() {
    this.activatedRoute.params.subscribe(raffleItem => {
      this.raffleItem = raffleItem.rafflename
      this.getUsers()
      this.isRaffleStarted = false
      this.winnerList = []
      this.usersClone = []
    })

  }
  addUser() {
    const name = this.userNameElement.nativeElement.value
    const no = this.userNoElement.nativeElement.value
    if (no && name) {
      if (this.users.find(user => user.no === no) === undefined) {
        this.users = [...this.users, { name, no }]
        localStorage.setItem(this.raffleItem, JSON.stringify(this.users))
      } else {
        alert('Aynı karne numaralı kişi zaten girildi.')
      }
    } else {
      alert('Karne numarası veya isim bulunamadı')
    }
  }

  getUsers() {
    const arr = localStorage.getItem(this.raffleItem)
    let json
    try {
      json = JSON.parse(arr)
      if (json instanceof Array) {
        this.users = json
      } else {
        console.error('json verisi farklı geliyor', json)
        throw new Error('json verisi farklı geliyor')
      }
    } catch (error) {
      json = []
    }
    this.users = json
    return this.users
  }
  onEditMode() {
    this.editMode = !this.editMode
  }
  deleteItem(user: any) {
    const index = this.users.indexOf(user)
    if (index !== -1) {
      if (window.confirm('Kullanıcı Siliniyor')) {
        this.users.splice(index, 1)
        localStorage.setItem(this.raffleItem, JSON.stringify(this.users))
      }
    } else {
      alert('Katılımcı bulanamadı')
    }
  }
  raffleCountChange(event: any) {
    const value = +event.target.value
    if (value >= this.users.length && this.users.length > 1) {
      this.raffleCount = this.users.length - 1
    } else if (value < 1) {
      this.raffleCount = 1;
    } else {
      this.raffleCount = value
    }
  }
  startRaffle() {
    if(this.isRaffleStarted && window.confirm('Çekiliş Durdurulacak ?')){
      this.isRaffleStarted = false;
      this.raffleCountLeft = 0
      this.users = this.usersClone.slice()
    }else{
      this.isRaffleStarted = true;
      this.raffleCountLeft = this.raffleCount
      this.usersClone = this.users.slice()
      this.winnerList = []
    }
  }
  restartRaffleCountLeftAnim(){
    const element = this.raffleCountLeftElement.nativeElement;
    element.classList.toggle('rotate')
    element.offsetWidth
    element.classList.toggle('rotate')
  }
  raffle(){
    const arr = <Array<number>> getRandomNumbers(0, this.users.length - 1, 1)
    if(arr && arr.length === 1){
      const [random] = arr
      const user = this.users[random]
      this.users.splice(random, 1)
      this.winnerList.unshift(user)
      this.restartRaffleCountLeftAnim()
      console.log('random', random)
    }

  }
}
