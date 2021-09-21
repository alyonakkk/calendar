@@include('cellPopup.js');

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
}