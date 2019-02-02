import { Component, OnInit, ViewChild, ElementRef, HostListener, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRandomNumbers } from '../../../utils';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import Papa from 'papaparse';
(<any>window).demitter = ';';
(<any>window).Papa = Papa;
@Component({
  selector: 'app-raffle-item',
  templateUrl: './raffle-item.component.html',
  styleUrls: ['./raffle-item.component.scss']
})
export class RaffleItemComponent implements OnInit {
  @ViewChild('raffleCountLeftElement') raffleCountLeftElement: ElementRef;
  constructor(public activatedRoute: ActivatedRoute, public dataService: DataService) { }
  raffleItem
  users: Array<any>
  editMode = false
  raffleCount = 1
  raffleCountLeft = 0;
  usersClone
  winnerList
  animationSubject: Subject<any>
  @ViewChild('username') userNameElement: ElementRef;
  @ViewChild('userno') userNoElement: ElementRef;
  @ViewChild('mosque') mosqueElement: ElementRef;
  @ViewChild('inputFile') fileElement: ElementRef;
  ngOnInit() {
    this.activatedRoute.params.subscribe(raffleItem => {
      this.raffleItem = raffleItem.rafflename
      this.getUsers()
      this.dataService.isRaffleStarted = false
      this.winnerList = []
      this.usersClone = []
      this.raffleCountLeft = 0
      this.dataService.isRaffleEnded = false
    })
    this.animationSubject = new Subject();
  }
  addUser() {
    const isim = this.userNameElement.nativeElement.value
    const no = this.userNoElement.nativeElement.value
    const cami = this.mosqueElement.nativeElement.value
    if (no && isim) {
      if (this.users.find(user => user.no === no) === undefined) {
        this.users = [...this.users, { isim, no, cami }]
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
    if (this.dataService.isRaffleStarted && window.confirm('Çekiliş Durdurulacak ?')) {
      this.dataService.isRaffleStarted = false;
      this.raffleCountLeft = 0
      this.users = this.usersClone.slice()
    } else {
      this.dataService.isRaffleStarted = true;
      this.raffleCountLeft = this.raffleCount
      this.usersClone = this.users.slice()
      this.winnerList = []
    }
  }
  restartRaffleCountLeftAnim() {
    const element = this.raffleCountLeftElement.nativeElement;
    element.classList.toggle('rotate')
    element.offsetWidth
    element.classList.toggle('rotate')
  }
  raffle() {
    const arr = <Array<number>>getRandomNumbers(0, this.users.length - 1, 1)
    if (arr && arr.length === 1) {
      const [random] = arr
      const user = this.users[random]
      this.users.splice(random, 1)
      this.winnerList.unshift(user)
      this.raffleCountLeft--
      this.restartRaffleCountLeftAnim()
      this.animationSubject.next(user)
      console.log('random', random)
      if (this.raffleCountLeft === 0) {
        this.reset()
      }
    }
  }
  reset() {
    // this.getUsers()
    // this.users
    this.dataService.isRaffleStarted = false
    this.dataService.isRaffleEnded = true
    // this.winnerList = []
    // this.usersClone = []
    this.raffleCountLeft = 0
  }
  saveUserListCsv() {
    if (this.users.length <= 0) {
      return
    }
    const demitter = (<any>window).demitter || ';'
    const keys = Object.keys(this.users[0])
    let text = keys.join(demitter)
    this.users.forEach(element => {
      text += '\r\n'
      let values = []
      for (const key of keys) {
        values.push(element[key])
      }
      text += values.join(demitter)
    });
    const fileNameToSaveAs = this.raffleItem + '-Kalananlar.csv';
    this.downloadCsv(fileNameToSaveAs, text)
  }
  saveUserListClick() {
    let text = this.raffleItem + '-Kalanlar'
    text = window.prompt('Benzersiz bir isim giriniz (KALANLAR)', text)
    if (!text) {
      return
    }
    const result = this.dataService.addRaffleItem(text)
    if (result) {
      localStorage.setItem(text, JSON.stringify(this.users))
    } else {
      alert('Hata, Benzersiz bir isim giriniz')
    }
  }
  saveWinnerList() {
    let text = this.raffleItem + '-Kazananlar'
    text = window.prompt('Kazananlar için benzersiz isim giriniz', text)
    if (!text) {
      return
    }
    const result = this.dataService.addRaffleItem(text)
    if (result) {
      localStorage.setItem(text, JSON.stringify(this.winnerList))
    } else {
      alert('Hata, Benzersiz bir isim giriniz')
    }

  }
  clearInputFile(){
    this.fileElement.nativeElement.value = ''
  }
  saveWinnerListCsv() {
    if (this.winnerList.length <= 0) {
      return
    }
    const demitter = (<any>window).demitter || ';'
    const keys = Object.keys(this.winnerList[0])
    let text = Papa.unparse(this.winnerList, {
      demitter: demitter,
      header: true,
      skipEmptyLines: 'greedy',
      encoding: 'UTF-8'
    })
    console.log('text', text)
    // let text = keys.join(demitter)
    // this.winnerList.forEach(element => {
    //   text += '\r\n'
    //   let values = []
    //   for (const key of keys) {
    //     values.push(element[key])
    //   }
    //   text += values.join(demitter)
    // });
    const fileNameToSaveAs = this.raffleItem + '-Kazananlar.csv';
    this.downloadCsv(fileNameToSaveAs, text)

  }
  downloadCsv(fileName, text) {
    console.log(fileName)
    console.log(text)
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
  }
  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
  csvImport(event) {
    console.log('Event', event)
    console.log('fileElement', this.fileElement.nativeElement)
    const file = event.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (csvTextEvent: any) => {
        console.log(csvTextEvent)
        console.log('Papa', Papa)
        const csvText = csvTextEvent.target.result
        const papaResult = Papa.parse(csvText, { header: true, skipEmptyLines: 'greedy' })
        console.log('papaResult', papaResult)
        const data = papaResult.data
        if (data && data.length > 0) {
          const keys = Object.keys(data[0])
          const acceptableKeys = ['cami', 'no', 'isim']
          let result = true
          for (const key of acceptableKeys) {
            if (keys.indexOf(key) === -1) {
              result = false
            }
          }
          if (!result) {
            alert("Okunan CSV dosyasının üst bilgi kısmında 'cami', 'no', 'isim' isimlendirmeleri bulunmak zoruda")
            console.log('CSV HATASI keys', keys)
            this.clearInputFile()
            return
          }

          const csvUserList = data.map(user => ({ isim: user.isim, no: user.no, cami: user.cami }))
          let karneNoErrorArr = []

          csvUserList.forEach((user, index) => {
            if (typeof user.no === 'string') {
              if (user.no.length < 1) {
                karneNoErrorArr.push({ id: index, not: 'numarası yok. no =>' + user.no })
              }
              if (isNaN((user.no) * 1)) {
                karneNoErrorArr.push({ id: index, not: 'Numarasında sayıdan başka karakterler de var. no =>' + user.no })
              }
            } if (user.no == 0) {
              karneNoErrorArr.push({ id: index, not: 'karne numarası 0' })

            }
          })
          if (karneNoErrorArr.length > 0) {
            console.log('Karne numaralırı hata verisi', karneNoErrorArr)
            const text = karneNoErrorArr.map(item => {
              return `Satır: ${item.id}. \n\t ${item.not}`
            }).join('\n\n\n')
            alert('Karne numaralarındaki veriler tutarlı değil\n' + text)
            this.clearInputFile()
            return
          }
          console.log('Filtre sonrası csvUserList', csvUserList)

          let duplicatedDataArray = []
          csvUserList.forEach((user, i) => {
            csvUserList.forEach((data, j) => {
              if (j !== i && user.no === data.no) {
                // console.log('HERE', user.no)
                const id = `${i}-${j}`
                const res = duplicatedDataArray.find(e => e.id === `${j}-${i}`)
                if (!res) {
                  duplicatedDataArray.push({
                    id,
                    not: `${i} ile ${j} aynı karne numarasına sahipler`,
                    isim1: user.isim,
                    isim2: data.isim,
                    no: user.no,
                  })
                }
              }
            })

          })
          console.log('duplicatedDataArray', duplicatedDataArray)
          if (duplicatedDataArray.length > 0) {
            console.error('Duplicated veri var', duplicatedDataArray)
            const text = duplicatedDataArray.map(item => {
              return `Satır no: ${item.id}. Karne no: ${item.no} \n\t isim: ${item.isim1} | ${item.isim2}`
            }).join('\n\n\n')
            alert('Aynı karne numarasına sahip numaralar var \n' + text)
            this.clearInputFile()
            return
          }
          if(this.users.length < 1){
            localStorage.setItem(this.raffleItem, JSON.stringify(csvUserList));
            this.users = csvUserList
            return
          }
          console.log('GELDIM HÜLOOO', this.users)

        }
      }
      fileReader.onerror = (error) => {
        alert('Dosya yüklenemedi')
        console.error('DOSYA YÜKELEME HATASI', error)
      }
    } else {
      alert('Dosya bulunamadı')
    }
  }

  //  @HostBinding('class.someClass')
}
