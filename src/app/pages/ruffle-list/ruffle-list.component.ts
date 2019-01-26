import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
const LIST_KEY = 'list_key'
@Component({
  selector: 'app-user-list',
  templateUrl: './ruffle-list.component.html',
  styleUrls: ['./ruffle-list.component.scss']
})
export class RuffleListComponent implements OnInit {
  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }
  ngOnInit() { 
    this.refreshRuffleItems()
  }

  editMode = false
  items: Array<string>
  refreshRuffleItems(){
    let arr = localStorage.getItem(LIST_KEY)
    try {
      const json = JSON.parse(arr)
      if(json instanceof Array){
        this.items = json
      }else{
        console.error('json verisi farklı geliyor', json)
        throw new Error('json verisi farklı geliyor')
      }
    } catch (error) {
      this.items = []
    }
    return this.items
  }
  updateLocalStorage(){
    localStorage.setItem(LIST_KEY, JSON.stringify(this.items))
  }
  addRuffleItem(){
    const name = window.prompt('Çekilişe özel benzersiz bir ad giriniz.')
    if(!name){
      return
    }
    console.log('this.items', this.items)
    this.refreshRuffleItems()
    if(this.items.indexOf(name) === -1){
      localStorage.setItem(LIST_KEY, JSON.stringify([...this.items, name]))
      this.refreshRuffleItems()
    } else{
      alert('Bu isimde bir çekiliş zaten bulunuyor. Başka bir isim giriniz veya öncekini siliniz.')
    }
  }
  deleteItem(event, item){
    if(event && event.preventDefault && event.stopPropagation){
      event.preventDefault()
      event.stopPropagation()
      if(window.confirm(item + ' silinecek ?')){
        const index = this.items.indexOf(item)
        if(index !== -1){
          this.items.splice(index, 1)
          this.updateLocalStorage()
        }
      }
    }
  }
  selectedChildRouteLink = ''
  setRuffleItem(item){
    this.selectedChildRouteLink = item
    this.router.navigate([item], {relativeTo: this.activatedRoute})
  }

  onEditMode(){
    this.editMode = !this.editMode;
  }
}
