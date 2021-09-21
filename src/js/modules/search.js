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

