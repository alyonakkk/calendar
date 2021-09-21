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
}