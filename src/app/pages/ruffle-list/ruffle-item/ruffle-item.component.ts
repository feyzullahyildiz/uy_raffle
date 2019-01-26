import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruffle-item',
  templateUrl: './ruffle-item.component.html',
  styleUrls: ['./ruffle-item.component.scss']
})
export class RuffleItemComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }
  ruffleItem
  users: Array<any>
  editMode = false
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
    if(no && name){
      if(this.users.find(user => user.no === no) === undefined){
        this.users = [...this.users, {name, no}]
        localStorage.setItem(this.ruffleItem, JSON.stringify(this.users))
      }else{
        alert('Aynı karne numaralı kişi zaten girildi.')
      }
    }else{
      alert('Karne numarası veya isim bulunamadı')
    }
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
        localStorage.setItem(this.ruffleItem, JSON.stringify(this.users))
      }
    }else{
      alert('Katılımcı bulanamadı')
    }
  }
}
