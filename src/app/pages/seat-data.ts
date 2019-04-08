const seatList = {
  'A': 19,
  'B': 30,
  'C': 31,
  'D': 34,
  'E': 33,

  'G': 36,
  'H': 39,
  'I': 42,
  'J': 45,
  'K': 46,
  'L': 45,
  'M': 44,
  'N': 45,
  'O': 40,
  'P': 41,
  'Q': 44,
  'R': 45,

  'S': 44,
  'T': 38,
  'U': 28,
  'V': 30,
  'W': 32,
  'X': 34,
  'Y': 34,
  'Z': 40,
  'BALKON': 24,
};

let cacheList = Object.assign({}, seatList);
const SEAT_LIST_KEY = 'SEAT_LIST_KEY';

export const getSeatList = () => {
  if (!window.localStorage) {
    console.warn('LocalStorage not supported');
    return cacheList;
  }
  const _list = window.localStorage.getItem(SEAT_LIST_KEY);
  if (_list) {
    return JSON.parse(_list);
  }
  return cacheList;
}
export const setSeatList = (newList) => {
  cacheList = newList;
  if (window.localStorage) {
    window.localStorage.setItem(SEAT_LIST_KEY, JSON.stringify(newList));
  }
}
export const resetSeatList = () => {
  setSeatList(Object.assign({}, seatList));
}
export const calculateSeatList = () => {
  const list = getSeatList();
  const stringArray = [];
  Object.entries(list).forEach(([key, value]) => {
    for (let i = 1; i <= value; i++) {
      stringArray.push(`${key} - ${i}`);
    }
  })
  return stringArray;
}

const BACKWARD_TIME_KEY = 'backward_time_key';
export const getBackwardCountTime = () => {
  const value = localStorage.getItem(BACKWARD_TIME_KEY);
  if (value !== null) {
    return +value;
  }
  return 10;
}
export const setBackwardCountTime = (value: number) => {
  localStorage.setItem(BACKWARD_TIME_KEY, value.toString());
}

export const sleeper = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  })
}