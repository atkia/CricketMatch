import{battingTeam} from './ScoreBoard.js';
import {getPartnershipTable} from './partnership.js';
let div = document.getElementById('fifthRow'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    span = document.createElement('span'),
    p = document.createElement('p'),
button = document.getElementById('extras');
let string;
function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/mode.css";
    head.appendChild(link);
    return head
}
export function addExtra(){
    console.log('Extras......'+battingTeam.extras.getByes());
    string = 'Extras: '+battingTeam.extras.getByes()+','+battingTeam.extras.getLB()+','+battingTeam.extras.getWB()+','+
        battingTeam.extras.getNB()+','+battingTeam.extras.getPenalty();
    p.innerText = string;
    div2.appendChild(p);
}

export  function addPartnership(){
    let table = document.createElement('table');
    table = getPartnershipTable();
    div2.appendChild(table);
}

export function addModal(){
    addLink();

    div1.className = 'modal';
    span.className = 'close';
    span.id = 'span';
    div2.className = 'modal-content';
    div2.appendChild(span);

    div1.appendChild(div2);
    // div.appendChild(div1);
  return div1;
    // button.onclick= function() {
    //     div1.style.display = "block";
    // }
    // window.onclick = function(event) {
    //     if (event.target == div1) {
    //         div1.style.display = "none";
    //     }
    // }
}

//string = battingTeam.extras.getByes();



