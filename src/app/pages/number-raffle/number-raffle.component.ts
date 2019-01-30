import { Component, OnInit } from '@angular/core';
import Papa from 'papaparse';
@Component({
  selector: 'app-number-raffle',
  templateUrl: './number-raffle.component.html',
  styleUrls: ['./number-raffle.component.scss']
})
export class NumberRaffleComponent implements OnInit {
  constructor() { }
  ngOnInit() { 
    this.raffleCount = 0;
    this.raffleCountLeft = 0;
    this.winnerList = [];
    this.isRaffleStarted = false
    // this.isRaffleEnded = false
  }

  isRaffleStarted: boolean
  // isRaffleEnded: boolean
  resultArray: Array<any>
  raffleCount: number;
  raffleCountLeft: number;
  winnerList: Array<number>;
  
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
        throw new Error('Benzersiz sayılar üretilmesi mümkün değil')
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
    this.isRaffleStarted = true
  }
  downloadResult(){
    const fileName = window.prompt('Çekiliş sonucu için isim giriniz.');
    this.resultArray.sort((a, b) => a - b);
    const text = Papa.unparse({
      fields: ['no'],
      data: this.resultArray.map(a => [a])
    })
    if(text){
      const textFileAsBlob = new Blob([text], { type: 'text/csv;charset=UTF-8' });
      const fileNameToSaveAs = fileName;
  
      const downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      const webkitURL = (<any>window).webkitURL
      if (webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = webkitURL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = this.destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }
  
      downloadLink.click();
    }else{
      console.error('Papa hatası', text)
      alert('Beklenmedik bir hata oluştu')
    }

  }
  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
  
}
