import { Injectable } from '@angular/core';

const LIST_KEY = 'list_key'
@Injectable({
    providedIn: 'root'
})
export class DataService {
    private items: Array<string>
    static THAT

    isRaffleStarted = false
    isRaffleEnded = false

    constructor() {
        console.log('HERE DATA SERVICE')
        if(DataService.THAT){
            return DataService.THAT
        }
        DataService.THAT = this;
        (<any>window).dataService = this;
        this.refreshRaffleItems()
    }
    refreshRaffleItems() {
        let arr = localStorage.getItem(LIST_KEY)
        try {
            const json = JSON.parse(arr)
            if (json instanceof Array) {
                this.items = json
            } else {
                console.error('json verisi farklı geliyor', json)
                throw new Error('json verisi farklı geliyor')
            }
        } catch (error) {
            this.items = []
        }
        return this.items
    }
    getRaffleItems(): Array<string> {
        return this.items
    }
    // refreshRaffleItems(){

    // }
    addRaffleItem(name: string) {
        if (this.items.indexOf(name) === -1) {
            localStorage.setItem(LIST_KEY, JSON.stringify([...this.items, name]))
            this.refreshRaffleItems()
            return true
        }
        return false
    }
    updateLocalStorage() {
        localStorage.setItem(LIST_KEY, JSON.stringify(this.items))
    }

    removeRaffleItem(item) {
        const index = this.items.indexOf(item)
        if (index !== -1) {
            this.items.splice(index, 1)
            localStorage.removeItem(item)
            this.updateLocalStorage()
            return true
        }
        return false
    }
    duzelt(){
        this.isRaffleEnded = false;
        this.isRaffleStarted = false;
    }
}