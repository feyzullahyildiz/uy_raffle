import { Component, OnInit, Input, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-raffle-result-viewer',
  templateUrl: './raffle-result-viewer.component.html',
  styleUrls: ['./raffle-result-viewer.component.scss']
})
export class RaffleResultViewerComponent implements OnInit, OnDestroy {
  @Input() startObservable: Observable<any>
  unsubscription: Subscription
  user
  constructor() { }
  ngOnInit() {
    this.unsubscription = this.startObservable.subscribe((user) => {
      this.user = user
      console.log('HERE', user)
      this.activeClass = true;
      setTimeout(() => {
        this.activeClass = false;
      }, 5000)
    })
  }
  ngOnDestroy(){
    if(this.unsubscription)
    this.unsubscription.unsubscribe()
  }
  @HostBinding('class.active') activeClass: boolean = false;
}
