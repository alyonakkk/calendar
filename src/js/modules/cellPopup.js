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
}