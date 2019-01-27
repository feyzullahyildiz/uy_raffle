import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-raffle',
  templateUrl: './number-raffle.component.html',
  styleUrls: ['./number-raffle.component.scss']
})
export class NumberRaffleComponent implements OnInit {
  constructor() { }
  ngOnInit() { }

  resultArray: Array<any>

  start
  end
  count
  message
  success
  getRandomNumbers() {
    // console.log(start, end, count)
    const start = this.start
    const end = this.end
    const count = this.count

    const arr = []
    let i = 0;
    while (i < count) {
      let number = parseInt(<any>(Math.random() * (end - start + 1)))
      number += parseInt(start)
      if (arr.indexOf(number) === -1) {
        i++;
        arr.push(number)
      }
    }
    return arr
  }
  checkNumbers() {
    const start = this.start
    const end = this.end
    const count = this.count
    if (!start || !end || !count) {
      return;
    }
    try {
      if ((end - start + 1) < count) {
        throw new Error('Verilen aralıkta benzersiz sayılar üretilmesi mümkün değil')
      }
      if (start >= end) {
        throw new Error('Başlangıç sayısı bitiş sayısından büyük olamaz')
      }
      if (count < 1) {
        throw new Error('Çekiliş adedi 1den küçük olamaz')
      }
      this.success = true
      this.message = start + ' ile ' + end + ' arasında, ' + count + ' tane çekiliş çekilecektir.'
    } catch (error) {
      this.success = false
      this.message = error.message
    }
  }

  endValue(e) {
    const val = +e.target.value
    this.end = val
    this.checkNumbers()
  }
  startValue(e) {
    const val = +e.target.value
    this.start = val
    this.checkNumbers()
  }
  countValue(e) {
    const val = +e.target.value
    this.count = val
    this.checkNumbers()
  }
  raffle() {
    const arr = this.getRandomNumbers()
    this.resultArray = arr
  }
}
