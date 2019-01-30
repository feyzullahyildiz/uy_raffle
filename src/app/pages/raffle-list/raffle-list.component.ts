import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './raffle-list.component.html',
  styleUrls: ['./raffle-list.component.scss']
})
export class RaffleListComponent implements OnInit {
  constructor(public router: Router, public activatedRoute: ActivatedRoute, public dataService: DataService) { }
  ngOnInit() { }

  editMode = false
  updateLocalStorage(){
    this.dataService.updateLocalStorage()
  }
  addRaffleItem(){
    const name = window.prompt('Çekilişe özel benzersiz bir ad giriniz.')
    if(!name){
      return
    }
    this.dataService.refreshRaffleItems()
    if(this.dataService.getRaffleItems().indexOf(name) === -1){
      this.dataService.addRaffleItem(name)
    } else{
      alert('Bu isimde bir çekiliş zaten bulunuyor. Başka bir isim giriniz veya öncekini siliniz.')
    }
  }
  deleteItem(event, item){
    if(event && event.preventDefault && event.stopPropagation){
      event.preventDefault()
      event.stopPropagation()
      if(window.confirm(item + ' silinecek ?')){
        this.dataService.removeRaffleItem(item)
      }
    }
  }
  selectedChildRouteLink = ''
  setRaffleItem(item){
    this.selectedChildRouteLink = item
    this.router.navigate([item], {relativeTo: this.activatedRoute})
  }

  onEditMode(){
    this.editMode = !this.editMode;
  }
}
