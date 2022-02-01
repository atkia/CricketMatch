import{battingTeam} from './ScoreBoard.js';
import {getPartnershipTable} from './partnership.js';
let div = document.getElementById('fifthRow'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    span = document.createElement('span'),
    p = document.createElement('p'),
    // table = document.createElement('table'),
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
    if(div3.hasChildNodes()==true){
        div3.innerHTML = '';
    }
    console.log('Extras......'+battingTeam.extras.getByes());
    string = 'Extras: '+battingTeam.extras.getByes()+','+battingTeam.extras.getLB()+','+battingTeam.extras.getWB()+','+
        battingTeam.extras.getNB()+','+battingTeam.extras.getPenalty();
  //  p.id = 'extraInfo';
    p.innerText = string;
    div3.appendChild(p);
    return div3;
}

export  function addPartnership(){
   // div2.removeChild(p);
    let table=getPartnershipTable();
    if(div3.hasChildNodes()==true){
        div3.innerHTML = '';
    }
    div3.appendChild(table);
    return div3;
}

export function addModal(){
    addLink();

    div1.className = 'modal';
    span.className = 'close';
    span.id = 'span';
    div2.className = 'modal-content';
    div2.id = 'content';
    div2.appendChild(span);

    div1.appendChild(div2);
  return div1;
}


