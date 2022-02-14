import{battingTeam} from './ScoreBoard.js';
import {getTable} from './partnership.js';
import * as object from './PlayerData.js';
let div = document.getElementById('fifthRow'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    span = document.createElement('span'),
    p = document.createElement('p'),
    // table = document.createElement('table'),
button = document.getElementById('extras');
let string;
div3.id = 'modalContent';
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
    string = 'Extras: '+object.getByes(battingTeam.extras.byes)+','+object.getLB(battingTeam.extras.lByes)+','+object.getWB(battingTeam.extras.wB)+','+
        object.getNB(battingTeam.extras.noBall)+','+object.getPenalty(battingTeam.extras.penalty);
    p.innerText = string;
    div3.appendChild(p);
    return div3;
}
let divT = document.createElement('div');
export  function addPartnership(){

    // let div=   getPartnershipTable();
    if(div3.hasChildNodes()==true){
        div3.innerHTML = '';
    }
    div3.appendChild(getTable());
    console.log(div3);
    return div3;
}

export function addModal(){
    div1.innerHTML = '';
    addLink();

    div1.className = 'modal';
    div1.id = 'modal';
    span.className = 'close';
    span.id = 'span';
    div2.className = 'modal-content';
    div2.id = 'content';
    div2.appendChild(span);

    div1.appendChild(div2);
  return div1;
}



