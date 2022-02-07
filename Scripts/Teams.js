import {addModal} from "./Extras.js";
import * as utils from './LocalStorageUtils.js';
let body = document.getElementsByTagName('body')[0],
    div = document.createElement('div'),changedName,games=utils.getItem('gameId'),
    removeItem;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    //head.innerHTML = '';
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/teamList.css";
    head.appendChild(link);
}

function createTitle(){
    let h1 = document.createElement('h1'),
        h3 = document.createElement('h3'),
        sub = document.createElement('sub'),
        div1 = document.createElement('div');
    h1.innerText = 'Cricket scorer';
    // h3.innerText = 'scorer';
    div1.id = 'title';
    //h2.appendChild(h3);
    div1.appendChild(h1);
    div.appendChild(div1);
}

const getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
};

const getRandomColor = () => {
    const h = getRandomNumber(360);
    const s = getRandomNumber(100);
    const l = getRandomNumber(100);

    return `hsl(${h}deg, ${s}%, ${l}%)`;
};
function removeTeam(){
    let text = "Are you sure you want to delete this team? All the associated matches and players stats of this team will not be deleted."
    if(confirm(text)==true){
      return true;
    }

}
function editTeamName(name){
   // div=addModal();
    let teamName = prompt("Update Team",name);
    // if(teamName!=null){
    //     name = teamName;
    // }
    // let h3 = document.createElement('h3'),
    // input = document.createElement('input');
    // h3.innerText = 'Update Team';

    return teamName;

}


function createDiv(i,name){
    let div = document.createElement('div'),
    table = document.createElement('table'),
    tr1 = document.createElement('tr'),
    tr2= document.createElement('tr'),
    td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
    img = document.createElement('img'),
        img2 = document.createElement('img');
    //<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    img.id = 'editIcon';
    img.onclick=()=>{
        changedName = editTeamName(name);
        games.matches[i].innings[0].battingTeam.teamName = changedName;
        games.matches[i].innings[1].bowlingTeam.teamName = changedName;
        utils.setItem('gameId',games);
        td2.innerText = changedName;
    }
    img.src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png';
    img.alt = 'edit icon';
    img2.id = 'removeIcon';
    img2.src='https://cdn.onlinewebfonts.com/svg/img_304350.png';
    img2.alt = 'remove icon';
    img2.onclick=()=>{
        let confirmation =removeTeam();
        if(confirmation==true){
            games.matches[i].innings[0].battingTeam = '';
            games.matches[i].innings[1].bowlingTeam = '';
            utils.setItem('gameId',games);
            removeItem=true;
            teamName();
        }
    }
    div.id = 'teamDiv'
    td1.id = 'teamName';
    td1.rowSpan = 2;

    td1.innerText = name.charAt(0).toUpperCase();
    td1.style.backgroundColor = getRandomColor();
    td2.colSpan = 3;
    td2.innerText = name;
    td6.id = 'editTeamName';
    td6.rowSpan = 2;
    td6.appendChild(img);
    td7.rowSpan = 2;
    td7.id = 'remove';
    td7.appendChild(img2);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td6);
    tr1.appendChild(td7);
    td3.id = 'totalMatch';
    td3.innerText="Matches:  0";
    td4.id = 'totalWon';
    td4.innerText = "Won:  0";
    td5.id = 'totalLost';
    td5.innerText ='Lost:  0';

    tr2.appendChild(td3);
    tr2.appendChild(td4);
    tr2.appendChild(td5);

    table.appendChild(tr1);
    table.appendChild(tr2);
    div.appendChild(table);
    return div;
}


export function teamName(game){
    console.log("taken game:...."+ game);
    games = game;
    addLink();
 //   body.innerHTML='';
 //    if(div.hasChildNodes()==true){
 //        div.innerHTML = '';
 //    }
 //   createTitle();

//    div.className= 'center';
//    body.appendChild(div);
    let teamsName = [];
  //  console.log(game.matches[0].innings[0].battingTeam);
console.log(games.matches.length);
    for(let i=0;i<games.matches.length;i++){

      //  console.log('for loop a dhukce')
        if(teamsName[i] = games.matches[i].innings[0].battingTeam!=''){
            teamsName[i] = games.matches[i].innings[0].battingTeam.teamName;
            console.log('TeamsName: '+i+'   '+teamsName[i]);
         //   if(teamsName[i]!=''){
                let div1 = createDiv(i,teamsName[i]);
                div.appendChild(div1);
          //  }
        }
    }
    return div;
}