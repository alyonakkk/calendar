@@include('modules/var.js');
@@include('modules/render.js');
@@include('modules/quickPopup.js');
@@include('modules/search.js');

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

