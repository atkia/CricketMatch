import{battingTeam,striker,nonStriker}from './ScoreBoard.js';
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
export function getPartnershipTable(){
    ball = striker.batting.ballNo +nonStriker.batting.ballNo;
    td1.innerText =  striker.playerName;
    td2.innerText = '';
    td3.innerText = nonStriker.playerName;

    td4.innerText = striker.batting.run;
    td5.innerText = battingTeam.totalScore;
    td6.innerText = nonStriker.batting.run;
    td7.colSpan = 3;
    td7.id = 'ballNo'
    td7.innerText = '('+ball+')';
    td8.colSpan = 3;
    td8.innerText = "Extras:"+battingTeam.partnershipScore;
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