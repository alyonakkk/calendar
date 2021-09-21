let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let clicked = null;

let date = new Date(),
    todayMonth = date.getMonth(),
    todayYear = date.getFullYear(),
    nowMonth = null,
    nowYear = null;