import{battingTeam}from './ScoreBoard.js';

function getPartnershipTable(partnership){
    let table = document.createElement('table'),
        tr1 = document.createElement('tr'),
        tr2 = document.createElement('tr'),
        tr3 = document.createElement('tr'),
        tr4 = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3  = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6  = document.createElement('td'),
        td7 = document.createElement('td'),
        td8 = document.createElement('td');
    let ball =0;
    table.id = 'partnerShipTable';
    ball = partnership.player1Ball+partnership.player2Ball;
    td1.innerText =  partnership.player1Name;
    td2.innerText = '';
    td3.innerText = partnership.player2Name;
    td4.innerText = partnership.player1Run;
    let run = partnership.player1Run+partnership.player2Run+ partnership.extra;
    td5.innerText = ''+run;
    td6.innerText = partnership.player2Run;
    td7.colSpan = 3;
    td7.id = 'ballNo'
    td7.innerText = '('+ball+')';
    td8.colSpan = 3;
    console.log(partnership.extra);
    td8.innerText = "Extras:"+partnership.extra;
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr2.appendChild(td4);
    tr2.appendChild(td5);
    tr2.appendChild(td6);
    tr3.appendChild(td7);
    tr4.appendChild(td8);
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    return table;
}

export function getTable(){
    let div = document.createElement('div');
    for(let i=0;i<battingTeam.partnerShips.length;i++){
        console.log(i,battingTeam.partnerShips[i]);
        console.log(battingTeam.partnerShips[i].extra);
            div.appendChild(getPartnershipTable(battingTeam.partnerShips[i]));
    }
    return div;
}