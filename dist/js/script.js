let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let clicked = null;

let date = new Date(),
    todayMonth = date.getMonth(),
    todayYear = date.getFullYear(),
    nowMonth = null,
    nowYear = null;;
function putEventForDay() {
    let cells = document.querySelectorAll('.js-cell');
    cells.forEach(cell => {
        let cellDateString = `${cell.id}.${nowMonth + 1}.${nowYear}`;

        let eventForDay = events.find(e => e.date === cellDateString);
        if (eventForDay) {
            let cellEvent = cell.querySelector('.js-cell-title'),
                cellNames = cell.querySelector('.js-cell-names'),
                cellDescription = cell.querySelector('.js-cell-description');

            cellEvent.innerHTML = eventForDay.event;
            cellNames.innerHTML = eventForDay.names;
            cellDescription.innerHTML = eventForDay.descripion;

            cell.classList.add('td__td-event');
        }
    });
}

function cellEventListener() {
    let last = 0;

    let table = document.querySelector('.js-table');
    table.addEventListener('click', (e) => {
        closeWindows();

        let td = e.target.closest('td');

        if (td && td.id > 0) {
            clicked = td;

            let dateString = `${clicked.id}.${nowMonth + 1}.${nowYear}`;

            if (last !== 0) {
                last.classList.remove('td__active');

                if (last.classList.contains('td__td-event')) {
                    last.classList.remove('td__td-event-click');
                }
            }

            if (clicked.classList.contains('td__td-event')) {
                clicked.classList.add('td__td-event-click');
            }

            clicked.classList.add('td__active');
            last = clicked;

            openCellPopup(dateString);
        }
    });
}

function openCellPopup(dateString) {
    let eventInput = document.querySelector('.js-cell-popup-event');
    let dateInput = document.querySelector('.js-cell-popup-date');
    let namesInput = document.querySelector('.js-cell-popup-names');
    let descriptionInput = document.querySelector('.js-cell-popup-description');

    eventInput.value = '';
    namesInput.value = '';
    descriptionInput.value = '';

    putEventToPopup(dateString, eventInput, namesInput, descriptionInput);

    let cellPopup = document.querySelector('.js-cell-popup');
    cellPopup.style.display = 'flex';

    let cellPosition = clicked.getBoundingClientRect();
    cellPopup.style.left = cellPosition.left + cellPosition.width + 14 + 'px';
    cellPopup.style.top = cellPosition.top + 'px';

    let inputDate = document.querySelector('.js-cell-popup-date');
    inputDate.value = dateString;

    closeCellButton();
    createEvent(eventInput, dateInput, namesInput, descriptionInput);
    removeEvent(dateInput);
}

function putEventToPopup(dateString, eventInput, namesInput, descriptionInput) {
    let eventForDay = events.find(e => e.date === dateString);
    if (eventForDay) {
        eventInput.value = eventForDay.event;
        namesInput.value = eventForDay.names;
        descriptionInput.value = eventForDay.descripion;
    }
}

function createEvent(eventInput, dateInput, namesInput, descriptionInput) {
    let form = document.querySelector('.js-cell-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (eventInput.value.length === 0) {
            eventInput.classList.add('cell-popup__input-invalid');
        } else {
            events = events.filter(e => e.date !== dateInput.value);
            localStorage.setItem('events', JSON.stringify(events));

            events.push({
                date: dateInput.value,
                event: eventInput.value,
                names: namesInput.value,
                descripion: descriptionInput.value
            });

            localStorage.setItem('events', JSON.stringify(events));

            clicked = null;
            closeWindows();
            render(nowMonth, nowYear);
        }
    });
}

function removeEvent(dateInput) {
    let removeEv = document.querySelector('.js-cell-popup-remove');
    removeEv.addEventListener('click', () => {

        events = events.filter(e => e.date !== dateInput.value);
        localStorage.setItem('events', JSON.stringify(events));

        clicked = null;
        closeWindows();
        render(nowMonth, nowYear);
    });
}

function closeCellButton() {
    let close = document.querySelector('.js-cell-popup-close');
    close.addEventListener('click', () => {
        closeWindows();
        clicked = null;
    });
};

function render(month, year) {
    let day = 1,
        daysInMonth = new Date(year, month + 1, 0).getDate(),
        firstDayInMonth = new Date(year, month).getDay(),
        months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    nowMonth = month;
    nowYear = year;

    let putNavDate = document.querySelector('.js-nav-date');
    putNavDate.innerHTML = `${months[month]} ${year}`;

    let tbody = document.querySelector('.js-tbody');
    tbody.innerHTML = '';

    for (let i = 1; i < 7; i += 1) {

        let tr = document.createElement('tr');
        tr.classList.add('table__tr');

        for (let j = 1; j <= 7; j += 1) {

            if (day <= daysInMonth) {
                let template = document.querySelector('#cell'),
                    cell = template.content.querySelector('.js-cell'),
                    cellDate = template.content.querySelector('.js-cell-date');

                if (i === 1) {
                    if (j >= firstDayInMonth) {
                        cellDate.innerHTML = `${daysOfWeek[j - 1]}, ${day}`;

                        cell.id = day;
                        day += 1;
                    } else {
                        cellDate.innerHTML = `${daysOfWeek[j - 1]}`;
                        cell.id = 0;
                    }
                } else {
                    cellDate.innerHTML = day;

                    cell.id = day;
                    day += 1;
                }

                let t = template.content.cloneNode(true);
                tr.appendChild(t);
            } else {
                break;
            }
        }

        tbody.appendChild(tr);
    }

    putEventForDay();
    cellEventListener();
};
let monthLow = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

(function () {
    let quickAdd = document.querySelector('.js-quick-add');

    quickAdd.addEventListener('click', () => {
        closeWindows();

        let popup = document.querySelector('.js-quick-popup');
        popup.style.display = 'block';
        quickAdd.classList.add('actions-header__btn-active');

        quickCreateEvent();
        closeQuickButton();
    });
})();

function quickCreateEvent() {
    let quickCreate = document.querySelector('.js-quick-create');
    quickCreate.addEventListener('click', () => {
        let quickInput = document.querySelector('.js-popup-input');
        let quickInputArr = quickInput.value.split(', ');
        let quickDate = quickInputArr[0];
        let quickDay = quickDate.split(' ')[0];
        let quickMonth = quickDate.split(' ')[1];
        let quickEvent = quickInputArr[1];
        let quickNames = quickInputArr[2];
        let dateString = `${quickDay}.${monthLow.indexOf(quickMonth) + 1}.${nowYear}`;

        if (quickInputArr.length !== 3 || (quickDay > 31 || quickDay < 0) || monthLow.indexOf(quickMonth) === -1) {
            quickInput.classList.add('popup__invalid-input');
        } else {
            quickInput.classList.remove('popup__invalid-input');

            let eventForDay = events.find(e => e.date === dateString);

            if (eventForDay) {
                alert('На этот день уже назначено событие!');
            } else {
                events.push({
                    date: dateString,
                    event: quickEvent,
                    names: quickNames,
                    descripion: ''
                });

                localStorage.setItem('events', JSON.stringify(events));

                render(monthLow.indexOf(quickMonth), nowYear);
            }

            clicked = null;
            closeWindows();
        }
    });
}

function closeQuickButton() {
    let closeQuickPopup = document.querySelector('.js-close-quick-popup');
    closeQuickPopup.addEventListener('click', () => {
        clicked = null;
        closeWindows();
    });
};
(function () {
    let searchInput = document.querySelector('.js-search-input');
    searchInput.value = '';

    searchInput.addEventListener('focus', () => {
        closeWindows();
        
        let searchClose = document.querySelector('.js-search-close');
        let searchListWrap = document.querySelector('.js-search-list-wrap');
        searchClose.style.display = 'block';
        searchListWrap.style.display = 'block';

        searchClose.addEventListener('click', () => {
            closeWindows();
        });

        renderSearchList();
    });

    searchInput.addEventListener('keyup', () => {
        let items = document.querySelectorAll('.js-search-item');
        items.forEach(item => {
            if (item.innerHTML.search(searchInput.value) === -1) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    });
})();

function renderSearchList() {
    let searchList = document.querySelector('.js-search-list');
    searchList.innerHTML = '';

    events.forEach(event => {
        let template = document.querySelector('#search-item');
        let eventTitle = template.content.querySelector('.js-search-list-event');
        let eventDate = template.content.querySelector('.js-search-list-date');

        eventTitle.innerHTML = event.event;
        eventDate.innerHTML = `${event.date.split('.')[0]} ${monthLow[event.date.split('.')[1] - 1]} ${event.date.split('.')[2]}`;

        let t = template.content.cloneNode(true);

        searchList.appendChild(t);
    });

    let items = document.querySelectorAll('.js-search-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            let itemDate = item.querySelector('.js-search-list-date').textContent;
            closeWindows();
            render(monthLow.indexOf(itemDate.split(' ')[1]), itemDate.split(' ')[2]);
        });
    });
}

;

(function () {
    let reloadBtn = document.querySelector('.js-reload');
    reloadBtn.addEventListener('click', () => {
        location.reload();
    });
})();

(function () {
    let nextBtn = document.querySelector('.js-nav-next');
    nextBtn.addEventListener('click', () => {
        if (nowMonth + 1 < 12) {
            nowMonth += 1;
        } else {
            nowMonth = 0;
            nowYear += 1;
        }

        closeWindows();
        render(nowMonth, nowYear);
    });

    let prevBtn = document.querySelector('.js-nav-prev');
    prevBtn.addEventListener('click', () => {
        if (nowMonth - 1 >= 0) {
            nowMonth -= 1;
        } else {
            nowMonth = 11;
            nowYear -= 1;
        }

        closeWindows();
        render(nowMonth, nowYear);
    });

    let todayBtn = document.querySelector('.js-nav-today');
    todayBtn.addEventListener('click', () => {
        closeWindows();
        render(todayMonth, todayYear);
    });
})();

function closeWindows() {
    let popup = document.querySelector('.js-quick-popup');
    let searchClose = document.querySelector('.js-search-close');
    let searchListWrap = document.querySelector('.js-search-list-wrap');
    let cellPopup = document.querySelector('.js-cell-popup');
    let searchInput = document.querySelector('.js-search-input');
    let quickInput = document.querySelector('.js-popup-input');
    let quickAdd = document.querySelector('.js-quick-add');
    let eventInput = document.querySelector('.js-cell-popup-event');

    searchInput.value = '';
    quickInput.value = '';

    popup.style.display = 'none';
    searchClose.style.display = 'none';
    searchListWrap.style.display = 'none';
    cellPopup.style.display = 'none';

    quickAdd.classList.remove('actions-header__btn-active');
    quickInput.classList.remove('popup__invalid-input');
    eventInput.classList.remove('cell-popup__input-invalid');

    if (!(!clicked && typeof clicked === 'object')) {
        clicked.classList.remove('td__active');

        if (clicked.classList.contains('td__td-event')) {
            clicked.classList.remove('td__td-event-click');
        }
    }
}

closeWindows();
render(todayMonth, todayYear);

