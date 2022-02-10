import {addModal} from "./Extras.js";
import * as utils from './LocalStorageUtils.js';
import * as scoreBoard from "./ScoreBoard.js";
import {createScoreBoardDiv} from './scoreBoardOfMatch.js';
let body = document.getElementsByTagName('body')[0],
    div = document.createElement('div'),changedName,games=utils.getItem('gameId'),
    removeItem;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link1 = document.createElement('link'),
        link2 = document.createElement('link');
  //  head.innerHTML = '';
    link1.rel = 'stylesheet';
    link1.href = "./Stylesheets/teamList.css";
    link2.rel = 'stylesheet';
    link2.href = "./Stylesheets/history.css";
    head.appendChild(link1);
    head.appendChild(link2)
}

// function createTitle(){
//     let h1 = document.createElement('h1'),
//         h3 = document.createElement('h3'),
//         sub = document.createElement('sub'),
//         div1 = document.createElement('div');
//     h1.innerText = 'Cricket scorer';
//     // h3.innerText = 'scorer';
//     div1.id = 'title';
//     //h2.appendChild(h3);
//     div1.appendChild(h1);
//     div.appendChild(div1);
// }

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
    console.log(match.innings[0].battingTeam.totalScore);
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
    div.className = 'teamDiv'
    td1.id = 'dateTime';
    td1.colSpan = 6;

    td1.innerText = match.date+'-'+match.time;
   // td2.id= 'circleData';
    td2.id = 'teamName';
    td2.style.backgroundColor = getRandomColor();
    if(match.innings[0].battingTeam==''){
        td2.innerText = 'UN';
    }else{
        td2.innerText = match.innings[0].battingTeam.teamName.charAt(0).toUpperCase();
    }
    tr1.appendChild(td1);
    td3.id = 'name';
    td3.colSpan = 3;
    if(match.innings[0].battingTeam==''){
        td3.innerText='Unknown';
    }else{
        td3.innerText=match.innings[0].battingTeam.teamName;
    }

    td4.id = 'runWicket';
    td4.colSpan=2;
    td4.innerText = match.innings[0].battingTeam.totalScore +"/"+match.innings[0].battingTeam.wicket+'('+match.innings[0].battingTeam.totalOver+')';
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);

    td5.id = 'teamName';
    td5.style.backgroundColor = getRandomColor();
    if(match.innings[0].bowlingTeam==''){
        td5.innerText = 'UN';
    }else{
        td5.innerText = match.innings[0].bowlingTeam.teamName.charAt(0).toUpperCase();
    }
    td6.id = 'name';
    if(match.innings[0].bowlingTeam==''){
        td6.innerText = 'Unknown';
    }else{
        td6.innerText = match.innings[0].bowlingTeam.teamName;
    }
    td6.colSpan=3;
    td7.id = 'runWicket';
    td7.colSpan = 2;
    td7.innerText = match.innings[1].battingTeam.totalScore +"/"+match.innings[1].battingTeam.wicket+'('+match.innings[1].battingTeam.totalOver+')';
    tr3.appendChild(td5);
    tr3.appendChild(td6);
    tr3.appendChild(td7);
    td8.id = 'matchStatusDetails';
    td8.colSpan = 4;
    td8.innerText =match.matchDetails;
    tr4.appendChild(td8);
   // td9.id = 'resume';

    button1.id = 'resume';
    button1.innerText = 'Resume';
    button1.onclick=()=>{
        console.log('resume button clicked');
        let div,
            div2 = document.getElementById('historyDiv');
        document.getElementById('fixedTitleDiv').style.display = 'none';
        for(let i=0;i<document.getElementsByClassName('teamDiv').length;i++){
            document.getElementsByClassName('teamDiv').item(i).style.display = 'none';
        }
        console.log(match.matchIndex);
        if(document.getElementById('scoreBoardDiv')!=null){
            document.getElementById('scoreBoardDiv').remove();
        }
        div = scoreBoard.createBody(match.matchIndex);
        div.id = 'scoreBoardDiv'
        div2.appendChild(div);
        document.getElementById('scoreBoardDiv').style.display = 'block';
        if(document.getElementById('addBowlerDiv')!=null){
            div.style.display = 'none';
        }
    }
    td9.colSpan=2;
    if(match.matchStatus=='running'){
        td9.appendChild(button1);
    }

    button2.id = 'scoreboard';
    button2.innerText = 'Scoreboard';
    button2.onclick=()=>{
        console.log('scoreboard button clicked');
        let div,
            div2 = document.getElementById('historyDiv');
        document.getElementById('fixedTitleDiv').style.display = 'none';
        document.getElementById('menuItems').style.display = 'none';
        console.log(match.matchIndex);
        for(let i=0;i<document.getElementsByClassName('teamDiv').length;i++){
            document.getElementsByClassName('teamDiv').item(i).style.display = 'none';
        }
        if(document.getElementById('historyScoreBoardDiv')!=null){
            document.getElementById('historyScoreBoardDiv').remove();
        }
        div = createScoreBoardDiv(match.matchIndex);
        div.id = 'historyScoreBoardDiv';
        div2.appendChild(div);
        document.getElementById('historyScoreBoardDiv').style.display = 'block';
    }
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


export function history(){
    games = utils.getItem('gameId');
    addLink();
    div.innerHTML = '';
    let teamsName = [];
    console.log(games.matches.length);
    for(let i=0;i<games.matches.length;i++){
          console.log('for loop a dhukce')
            let div1 = createDiv(i,games.matches[i]);
            div.appendChild(div1);

    }
    return div;

}