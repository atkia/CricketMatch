// import {player} from "./PlayerData.js";

// import {team} from "./PlayerData";

let body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    div5 = document.createElement('div'),
    div6 = document.createElement('div'),
    headingDiv = document.createElement('div'),
    table = document.createElement('table'),
    BattingTeamName,BowlingTeamName,
    tr1 = document.createElement('tr'),
    tr2 = document.createElement('tr');
let c=0;
import * as players from './SelectOpeningPlayer.js' ;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    head.innerHTML = '';
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/ScoreBoard.css";
    head.appendChild(link);
    return head;
}

function getBattingName(){
    let tossWonBy = localStorage.getItem('tossWonBy');

    if(tossWonBy == 'HostTeam'){
        BattingTeamName = localStorage.getItem('Host Name');
        BowlingTeamName = localStorage.getItem('Visitor Name');
    }
    else{
        BowlingTeamName = localStorage.getItem('Host Name');
        BattingTeamName = localStorage.getItem('Visitor Name');
    }

}

function createSpan(id,innerText){
    let span = document.createElement('span');

    span.id = id;
    span.innerText = innerText;
    div2.appendChild(span);
}

function createFirstRow(){
    let br = document.createElement('br');
    createSpan("teamName", BattingTeamName);
    createSpan("",',');
    createSpan('innings','1st inning');
    div2.appendChild(br);
    createSpan("runScore",'0');
    createSpan("scoreP","-");
    createSpan("wicket",'0');
}

function createTitle(){
    let h2 = document.createElement('h2');

    getBattingName();

    h2.innerText = BattingTeamName+" v/s "+BowlingTeamName;
    headingDiv.id = "title";
    headingDiv.appendChild(h2);
}

function createTableData(id,data){
    let td = document.createElement('td');
    if(id==''){
        td.innerText = data;
    }
    else{
        td.id = id;
        td.innerText = data;
    }
    return td;
}

function createTableHead(){
     let tr = document.createElement('tr'),
     td = document.createElement('td');
     let data1=['Batsman','R','B','4s','6s','SR'];
        for (let i = 0; i < 6; i++) {
                if (i == 0) {
                    td = createTableData('leftTd', data1[i]);
                }
                else {
                    td = createTableData('', data1[i]);
                }
            tr.appendChild(td);
        }
        table.appendChild(tr);
}
function getTd(player){

    c++;
    console.log(player);

    let tr = document.createElement('tr'),
        td1,
        td2,
        td3,
        td4,
        td5,
        td6;

if(c==2){
    td1 = createTableData('nonStrikerName',player.playerName);
}
else{
    td1 = createTableData('strikerName',player.playerName);
}

    td2 = createTableData(c+'run',player.batting.run);
    td3 = createTableData(c+'ball',player.batting.ballNo);
    td4 = createTableData(c+'4s',player.batting.fours);
    td5 = createTableData(c+'6s',player.batting.sixs);
    td6 = createTableData(c+'SR',player.batting.sR())

    tr.appendChild( td1);
    tr.appendChild( td2);
    tr.appendChild( td3);
    tr.appendChild( td4);
    tr.appendChild( td5);
    tr.appendChild( td6);
    return tr;
}

 function createStrikerDetailRow(){
    if(players.hostTeam.type == 'batting'){
        let playerNo = players.hostTeam.players.length;
        let player = players.hostTeam.players[playerNo-2];
        console.log(player);
        tr1 = getTd(player);
    }
    else{
        let playerNo = players.visitorTeam.players.length;
        let player = players.visitorTeam.players[playerNo-2];
        tr1 = getTd(player);
    }
}
function createNonStrikerDetailRow(){
    if(players.hostTeam.type == 'batting'){
        let playerNo = players.hostTeam.players.length;
        let player = players.hostTeam.players[playerNo-1];
        console.log(player);
        tr2 = getTd(player);
    }
    else{
        let playerNo = players.visitorTeam.players.length;
        let player = players.visitorTeam.players[playerNo-1];
        tr2 = getTd(player);
    }
}


function createSecondRow(){
    // let table = document.createElement('table');
    // table.appendChild(createTableHead());
    createTableHead();
    createStrikerDetailRow();
    tr1.id = 'strikerDetails';
    createNonStrikerDetailRow();
    tr2.id = 'nonStrikerDetails';
    table.appendChild(tr1);
    table.appendChild(tr2);
    div3.appendChild(table);
}

function createThirdRow(){}

function createFourthRow(){}
function getScoreButton(value){
    let input = document.createElement('input');
    input.type = 'button';
    input.className = 'button'
    input.value = value;
    if(value%2==0){
        input.onclick = ()=>{
            if(players.hostTeam.type == 'batting'){
                let playerNo = players.hostTeam.players.length;
                let player = players.hostTeam.players[playerNo-2];
                player.batting.getRuns(value);
                document.getElementById('strikerName').innerText = player.playerName;
                document.getElementById('1run').innerText =player.batting.run;
                document.getElementById("runScore").innerText = players.hostTeam.totalScore();
                // console.log(player);
            }
            else {
                let playerNo = players.visitorTeam.players.length;
                let player = players.visitorTeam.players[playerNo-2];
                player.batting.getRuns(value);
                document.getElementById('strikerName').innerText = player.playerName;
                document.getElementById('1run').innerText =player.batting.run;
                document.getElementById("runScore").innerText = players.visitorTeam.totalScore();
                // console.log(player);
            }

        }
    }
    else{
        input.onclick = ()=>{
            if(players.hostTeam.type == 'batting'){
                let playerNo = players.hostTeam.players.length;
                let player = players.hostTeam.players[playerNo-1];
                player.batting.getRuns(value);
                document.getElementById('nonStrikerName').innerText = player.playerName;
                document.getElementById('2run').innerText =player.batting.run;
                document.getElementById("runScore").innerText = players.hostTeam.totalScore();
                // console.log(player.batting.run);
            }
            else {
                let playerNo = players.visitorTeam.players.length;
                let player = players.visitorTeam.players[playerNo-1];
                player.batting.getRuns(value);
                document.getElementById('nonStrikerName').innerText = player.playerName;
                document.getElementById('2run').innerText =player.batting.run;
                document.getElementById("runScore").innerText = players.visitorTeam.totalScore();
                // console.log(player.batting.run);
            }

        }
        }

    return input;

}

function createFifthRow(){
    let table = document.createElement('table');
    for(let i=1;i<=6;i++){
        div6.appendChild(getScoreButton(i));
    }

}

export function createBody(){
    body.innerHTML = '';
    addLink();
    div1.id = "center";
    div2.id = "firstRow";
    div3.id = "secondRow";
    div4.id = "thirdRow";
    div5.id = "fifthRow";
    div6.id = "fifthRow";
    createTitle();
    createFirstRow();
    createSecondRow();
    createFifthRow();
    div1.appendChild(headingDiv);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    div1.appendChild(div6);
    body.appendChild(div1);

    return body;
}
