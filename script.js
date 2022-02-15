const cell = (content, attrs) => `<td ${attrs || ''}>${content}</td>`;

const row = (content) => `<tr>${content}</tr>`;
const header_cell = (content) => `<th>${content}</th>`;

const table = (header, rows, klass) => `<table class="${klass || ''}">
<thead>${row(header.map((_header_cell) => header_cell(_header_cell)).join(''))}</thead>
<tbody>${rows.map(
        (row_cells) => row(
            row_cells.map(
                (row_cell) => cell(row_cell)
            ).join('')
        )
    ).join('')}</tbody>
</table>`

const ru_moment = () => moment().locale('ru');

const render = function () {

    let startDay = ru_moment().startOf('week');
    let endDay = ru_moment().endOf('week');

    let header = [];
    for (let d = startDay; d <= endDay; d.add(1, 'days')){
        header.push(d.format('dd'));
    }

    let rows = [];
    const emptySquare = '&nbsp;&#9634;';
    let day = ru_moment().startOf('week');
    for(let week = 0 ; week < 7 ; week++){
        let week_cells = [];
        for(let dow = 0 ; dow < 7 ; dow++){
            week_cells.push(
                `<span>${day.format('DD MMM')}</span>
                <table class="cell">
                ${row([
                    cell("&nbsp;", 'rowspan=2, class="left-cell"'),
                    cell((`Ва:${emptySquare}<br>` +
                          `Вл:${emptySquare}`), "class='second-cell'")
                ].join(''))}
                ${row([cell((`Ва:${emptySquare}<br>` +
                             `Вл:${emptySquare}`), "class='thrid-cell'")].join(''))}
                </table>
                `


            )
            day.add(1, 'days');
        }
        rows.push(week_cells);
    }


    $("#schedule").html(table(header, rows, "schedule"));
};

$(document).ready(render)
