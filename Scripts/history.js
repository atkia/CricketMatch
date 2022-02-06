import {addModal} from "./Extras.js";
import * as utils from './LocalStorageUtils.js';
import * as scoreBoard from "./ScoreBoard.js";

let body = document.getElementsByTagName('body')[0],
    div = document.createElement('div'),changedName,games=utils.getItem('gameId'),
    removeItem;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link1 = document.createElement('link'),
        link2 = document.createElement('link');
    head.innerHTML = '';
    link1.rel = 'stylesheet';
    link1.href = "./Stylesheets/teamList.css";
    link2.rel = 'stylesheet';
    link2.href = "./Stylesheets/history.css";
    head.appendChild(link1);
    head.appendChild(link2)
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

// function createTd(){
//    let td2 = document.createElement('td');
//    td.id
// }

function createDiv(i,match){
    let div = document.createElement('div'),
        table = document.createElement('table'),
        tr1 = document.createElement('tr'),
        tr2= document.createElement('tr'),
        tr3 = document.createElement('tr'),
        tr4= document.createElement('tr'),
        tr5 = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
        td8 = document.createElement('td'),
        td9 = document.createElement('td'),
        td10 = document.createElement('td'),
        td11 = document.createElement('td'),
        td12 = document.createElement('td'),
        img = document.createElement('img'),
        img2 = document.createElement('img'),
        button1 = document.createElement('button'),
        button2 = document.createElement('button');
    //<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    img.id = 'archiveIcon';
    img.onclick=()=>{
    }
    img.src='https://th.bing.com/th/id/R.e1a955806a2434828f6a9894ff282ee1?rik=yDb87Gi5r8bc0Q&pid=ImgRaw&r=0';
    img.alt = 'archive';
    img2.id = 'removeIcon';
    img2.src='https://cdn.onlinewebfonts.com/svg/img_304350.png';
    img2.alt = 'remove icon';
    img2.onclick=()=>{
        let confirmation =removeTeam();
        if(confirmation==true){
            games.matches.splice(i,1);
            utils.setItem('gameId',games);
            removeItem=true;
            history();
        }
    }
    div.id = 'teamDiv'
    td1.id = 'dateTime';
    td1.colSpan = 6;

    td1.innerText = match.date+'-'+match.time;
   // td2.id= 'circleData';
    td2.id = 'teamName';
    td2.style.backgroundColor = getRandomColor();
    td2.innerText = match.innings[0].battingTeam.teamName.charAt(0).toUpperCase();
    // let span1 = document.createElement('span');
    // span1.id = 'teamName';
    // span1.style.backgroundColor = getRandomColor();
    // span1.innerText = match.innings[0].battingTeam.teamName.charAt(0).toUpperCase();
    //td2.appendChild(span1);
   // td6.id = 'editTeamName';
  //  td6.rowSpan = 2;
 //   td6.appendChild(img);
 //   td7.rowSpan = 2;
 //   td7.id = 'remove';
 //   td7.appendChild(img2);
    tr1.appendChild(td1);
    // tr1.appendChild(td2);
    // tr1.appendChild(td6);
    // tr1.appendChild(td7);
    td3.id = 'name';
    td3.colSpan = 3;
    td3.innerText=match.innings[0].battingTeam.teamName;
    td4.id = 'runWicket';
    td4.colSpan=2;
    td4.innerText = match.innings[0].battingTeam.totalScore +"/"+match.innings[0].battingTeam.wicket+'('+match.innings[0].battingTeam.totalOver+')';
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);

    td5.id = 'teamName';
    td5.style.backgroundColor = getRandomColor();
    td5.innerText = match.innings[0].bowlingTeam.teamName.charAt(0).toUpperCase();
    //let span = document.createElement('span');
    // span.id = 'teamName';
    // span.style.backgroundColor = getRandomColor();
    // span.innerText = match.innings[0].bowlingTeam.teamName.charAt(0).toUpperCase();
   // td5.appendChild(span);

    td6.id = 'name';
    td6.innerText=match.innings[0].bowlingTeam.teamName;
    td6.colSpan=3;
    td7.id = 'runWicket';
    td7.colSpan = 2;
    td7.innerText = match.innings[1].battingTeam.totalScore +"/"+match.innings[1].battingTeam.wicket+'('+match.innings[1].battingTeam.totalOver+')';
    tr3.appendChild(td5);
    tr3.appendChild(td6);
    tr3.appendChild(td7);
    td8.id = 'totalLost';
    td8.colSpan = 4;
    td8.innerText =match.tossWonBy +' won the toss and opted to '+match.optedTo+" first";
    tr4.appendChild(td8);
   // td9.id = 'resume';
    button1.id = 'resume';
    button1.innerText = 'Resume';
    button1.onclick=()=>{
        console.log(match.matchIndex);
        scoreBoard.createBody(match.matchIndex);
    }
    td9.colSpan=2;
    td9.appendChild(button1);
    button2.id = 'scoreboard';
    button2.innerText = 'Scoreboard';
    td10.colSpan=2;
    td10.appendChild(button2);
    td11.id = 'archive';
    td11.appendChild(img);
    td12.id = 'remove';
    td12.appendChild(img2);
    tr5.appendChild(td9);
    tr5.appendChild(td10);
    tr5.appendChild(td11);
    tr5.appendChild(td12);
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    table.appendChild(tr5);
    div.appendChild(table);
    return div;
}


export function history(game){
    console.log("taken game:...."+ game);

    if(game==null ){
        games = utils.getItem('gameId');
    }else{
        games = game;
    }

    addLink();
    body.innerHTML='';
    if(div.hasChildNodes()==true){
        div.innerHTML = '';
    }
    createTitle();

    div.className= 'center';
    body.appendChild(div);
    let teamsName = [];
    //  console.log(game.matches[0].innings[0].battingTeam);
    console.log(games.matches.length);
    for(let i=0;i<games.matches.length;i++){
          console.log('for loop a dhukce')
            let div1 = createDiv(i,games.matches[i]);
            div.appendChild(div1);

    }

}