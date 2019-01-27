function checkNumbers(start, end, count) {
    // const start = this.start
    // const end = this.end
    // const count = this.count
    if (start < 0 || !end || !count) {
      return false;
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
      return true
    } catch (error) {
      console.log('ERR', error.message)
      return false
    }
  }
export function getRandomNumbers(start, end, count) {
    // console.log(start, end, count)
    if(!checkNumbers(start, end, count)){
        return
    }
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