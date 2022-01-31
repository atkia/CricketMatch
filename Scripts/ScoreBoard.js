import * as players from './SelectOpeningPlayer.js' ;
import {addExtra, addModal, addPartnership} from './Extras.js';
import{getPartnershipTable} from './partnership.js';
let body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    div5 = document.createElement('div'),
    div6 = document.createElement('div'),
    headingDiv = document.createElement('div'),
    table = document.createElement('table'),
    table2 = document.createElement('table'),
    scoreTable = document.createElement('table'),
    scoreTR1 = document.createElement('tr'),
    scoreTR2 = document.createElement('tr'),
    BattingTeamName,BowlingTeamName,
    tr = document.createElement('tr'),
    tr1 = document.createElement('tr'),
    tr2 = document.createElement('tr'),bowler,bowlingTeam,
    count = 0,byes,lB,NB,wide;
export let battingTeam,striker,nonStriker;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
  //  head.innerHTML = '';
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/ScoreBoard.css";
    head.appendChild(link);
    return head;
}

function getBattingName(){
    let tossWonBy = localStorage.getItem('tossWonBy');

    if(tossWonBy == 'HostTeam'){
        BattingTeamName = localStorage.getItem('Host Name');
        battingTeam = players.hostTeam;
        BowlingTeamName = localStorage.getItem('Visitor Name');
        bowlingTeam = players.visitorTeam;
    }
    else{
        BowlingTeamName = localStorage.getItem('Host Name');
        bowlingTeam = players.hostTeam;
        BattingTeamName = localStorage.getItem('Visitor Name');
        battingTeam = players.visitorTeam;
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
    let h1 = document.createElement('h1');

    getBattingName();

    h1.innerText = BattingTeamName+" v/s "+BowlingTeamName;
    headingDiv.id = "title";
    headingDiv.appendChild(h1);
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

function createTableHead(string){

    let tr = document.createElement('tr'),
        th = document.createElement('th');
    //    hr = document.createElement('hr');
    tr.id = "tableHead";
    let data1=['Batsman','R','B','4s','6s','SR'],
        data2 = ['Bowler','O','M','R','W','ER'],
        data;
    if(string =='batsman') {
        data = data1;
    }
    else{
        data = data2;
    }
    for (let i = 0; i < 6; i++) {
        if (i == 0) {
            th = createTableData('leftTd', data[i]);
        } else {
            th = createTableData('', data[i]);
        }
        tr.appendChild(th);
    }
    // table.appendChild(tr);
    return tr;
}

function changeBattingTableData(player,string,type){
    console.log("table data: "+ player);
    let tr = document.createElement('tr'),
        td1=document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td');

    td1.id = "playerName";
    td1.innerText = player.playerName+string;

    if(type =='bat'){
        td2.innerText=player.batting.run;
        td3.innerText = player.batting.ballNo;
        td4.innerText =player.batting.fours;
        td5.innerText = player.batting.sixs;
        td6.innerText = player.batting.sR();
    }
    else{
        td2.innerText = player.bowling.overs;
        td3.innerText = player.bowling.maiden;
        td4.innerText = player.bowling.run;
        td5.innerText = player.bowling.wickets;
        td6.innerText = player.bowling.eR();
    }

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
        striker = players.hostTeam.players[playerNo-2];
        console.log("strikerDetails:  "+striker);
        tr1 = changeBattingTableData(striker,'*','bat');
    }
    else{
        let playerNo = players.visitorTeam.players.length;
        striker = players.visitorTeam.players[playerNo-2];
        tr1 = changeBattingTableData(striker,'*','bat');
    }
}

function createNonStrikerDetailRow(){
    if(players.hostTeam.type == 'batting'){
        let playerNo = players.hostTeam.players.length;
        nonStriker= players.hostTeam.players[playerNo-1];
        console.log("NonStrikerDetails:  "+nonStriker);
        tr2 = changeBattingTableData(nonStriker,'','bat');
    }
    else{
        let playerNo = players.visitorTeam.players.length;
        nonStriker = players.visitorTeam.players[playerNo-1];
        tr2 = changeBattingTableData(nonStriker,'','bat');
    }
}

function createBowlerDetailRow(){
    if(players.hostTeam.type == 'bowling'){
        let playerNo = players.hostTeam.players.length;
        bowler = players.hostTeam.players[playerNo-1];
        console.log("BowlerDetails:  "+ playerNo);
        console.log("BowlerDetails:  "+ bowler);
        tr = changeBattingTableData(bowler,'','bowler')
    }
    else{
        let playerNo = players.visitorTeam.players.length;
        bowler = players.visitorTeam.players[playerNo-1];
        console.log("Player No:  "+ playerNo);
        console.log("BowlerDetails:  "+ bowler);
        tr = changeBattingTableData(bowler,'','bowler')
    }
}

function createBattingPLayerTable(){
    table.innerHTML = '';
    table.appendChild(createTableHead('batsman'));
    createStrikerDetailRow();
    tr1.id = 'strikerDetails';
    createNonStrikerDetailRow();
    tr2.id = 'nonStrikerDetails';
    table.appendChild(tr1);
    table.appendChild(tr2);

}

function createBowlerTable(){
    table2.innerHTML ='';
    table2.appendChild(createTableHead('bowler'));
    createBowlerDetailRow();
    tr.id = 'bowlerDetails';
    table2.appendChild(tr);
}

function createSecondRow(){
    table.id = 'battingPLayerTable';
    createBattingPLayerTable();
    createBowlerTable();
    div3.appendChild(table);
    div3.appendChild(table2);
}

function createThirdRow(){
    let h3 = document.createElement('h3');
    // let span = document.createElement('span');
    h3.id = "scoreTaken";
    h3.innerText = "This over:  ";
    scoreTable.appendChild(scoreTR1);
    scoreTable.appendChild(scoreTR2);
    h3.appendChild(scoreTable);

    div4.appendChild(h3);
}

function calculate(value){
    if(value=="wicket"){
        bowler.bowling.wickets++;
        let name = striker.playerName,td = document.createElement('td'),td2 = document.createElement('td');
        alert(name +"is out");
        createBowlerTable();
        let span = document.createElement('span'),span2 = document.createElement('span');
        span.id = 'out';
        span.innerText = 'out';
        td.appendChild(span);
        scoreTR1.appendChild(td);
        span2.innerText='';
        td2.appendChild(span2);
        scoreTR2.appendChild(td2);

        // document.getElementById('scoreTaken').appendChild(span);

    }

    if(value == 'NoBall'){
        NB=true;
        bowler.bowling.getRuns(1);
        battingTeam.addPartnershipScore(1);
        // console.log("NB:   "+NB);
        // let span = document.getElementById()
        // document.getElementById('scoreTaken').appendChild(span);
    }

    if(value =='byes' ){
        byes = true;


    }

    if(value =='legByes' ){
        lB = true;

    }

    if(value == 'wide'){
        wide = true;
        battingTeam.addPartnershipScore(1);
    }
}

function getCheckBox(value){
    let input = document.createElement('input');

    input.type = "checkbox";
    input.id =value;
    input.value = value;
    input.onclick=()=>{
        console.log("checkbox:   "+value)
        calculate(value);
        // input.checked=false;
    }
    return input;
}

function getLabel(value){
    let label = document.createElement('label');
    label.htmlFor = value;
    label.innerText = value;
    return label;
}

function swapPlayer(value){
    let temp=[];
    if(value == 'odd'){
        for(let elem in nonStriker){
            temp[elem] = nonStriker[elem];
            nonStriker[elem] = striker[elem];
        }
        for(let elem in temp){
            striker[elem] = temp[elem];
        }
        console.log(striker);
        console.log(nonStriker);
    }

}

function createFourthRow(){
    let data = ['wide','NoBall','byes','legByes','wicket'],
    button1 = document.createElement('button'),
    button2 = document.createElement('button');
    for (let i=0;i<5;i++){
        div5.appendChild( getCheckBox(data[i]));
        div5.appendChild(getLabel(data[i]));
    }

    button1.id = 'retire';
    button1.innerText = "Retire";
    button1.onclick = ()=>{
        alert('retire...');
    }
    button2.id = 'swap';
    button2.innerText = "Swap Batsman";
    button2.onclick = ()=>{
        swapPlayer('odd');
        createBattingPLayerTable();
        console.log("Swap button work!!!")
    }
    div5.appendChild(button1);
    div5.appendChild(button2);
}

function checkOver(){
        scoreTR1.innerHTML='';
        scoreTR2.innerHTML='';
        count=0;
        alert("one over is done");
        console.log("c"+count);
}

function getScoreButton(value) {
    let input = document.createElement('input');
    input.type = 'button';
    input.className = 'button'
    input.value = value;

    input.onclick = () => {

        document.getElementById('wide').checked = false;
        document.getElementById('NoBall').checked = false;
        document.getElementById('byes').checked = false;
        document.getElementById('legByes').checked = false;
        document.getElementById('wicket').checked = false;

            count++;

            console.log("c......"+count);
            let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
            span.id = 'ball'+value;
            span2.id = 'type'

            if (value % 2 != 0) {
                swapPlayer('odd');
                console.log("Swapped");
            }

            if(byes==true || lB == true || wide ==true){
                span.innerText = '0';
                td1.appendChild(span);
                scoreTR1.appendChild(td1);
                battingTeam.addPartnershipScore(value);
                if(byes==true){
                    span2.innerText = value+'BYE';
                    battingTeam.extras.addByes(value);
                    td2.appendChild(span2)
                    scoreTR2.appendChild(td2);
                    byes=false;
                }
                if(lB==true){
                    span2.innerText = value+'LB';
                    battingTeam.extras.addLB(value);
                    td2.appendChild(span2)
                    scoreTR2.appendChild(td2);
                    console.log(span2);
                    lB = false;
                }
                if(wide==true){
                    let score = value+1;
                    span2.innerText = score+'WD';
                    battingTeam.extras.addWB(score);
                    // battingTeam.addPartnershipScore(1);
                    td2.appendChild(span2)
                    scoreTR2.appendChild(td2);

                }

            }
            else{
                span.innerText = value;
                td1.appendChild(span);
                scoreTR1.appendChild(td1);
                span2.innerText = '';
                td2.appendChild(span2)
                scoreTR2.appendChild(td2);
                striker.batting.getRuns(value);
                bowler.bowling.getRuns(value);
            }

            if(NB==true){
                let score = value+1;
                battingTeam.extras.addNB(1);
             //   battingTeam.addPartnershipScore(1);
                span2.innerText = 'NB';
                td2.appendChild(span2)
                scoreTR2.appendChild(td2);
            }

            if( wide!=true){
                striker.batting.ballNo++;
                if(NB!=true){
                    bowler.bowling.ballNo++;
                }

            }
            striker.batting.sR();

            bowler.bowling.getOver();

            document.getElementById('runScore').innerText = battingTeam.totalScore();
            console.log("player's SR: "+striker.batting.sR());
            if(value ==4 && byes!=true && lB != true &&wide !=true){
                striker.batting.fours++;
            }
            if(value==6&& byes!=true && lB != true &&wide !=true){
                striker.batting.sixs++;
            }
            table.innerHTML = '';
            createBattingPLayerTable();
            createBowlerTable();
            if(count==6){
                setTimeout(checkOver,2000);
            }
            // console.log('table recreated');
            // console.log(value);
            wide = false;
            NB=false;
        }
    return input;
}

function createFifthRow(){
    let button1 = document.createElement('button'),
        button2 = document.createElement('button'),
        button3 = document.createElement('button'),
        br = document.createElement('br'),
        br2 = document.createElement('br'),
        table = document.createElement('table'),
        table2 = document.createElement('table'),
        tr = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        div= document.createElement('div');
     //   div1 = document.createElement('div'),
     //   div2 = document.createElement('div');
        td1.id = 'leftSide';

    button1.id = 'undo';
    button1.innerText = 'Undo';
    button1.onclick=()=>{};
    button2.id = 'partnership';
    button2.innerText = 'Partnership';
    div = addModal();
    button2.onclick = ()=>{
        addPartnership();
        div.style.display = "block";
    }
    button3.id = 'extras';
    button3.innerText = "Extras";
 //   div2 = addModal();
     button3.onclick=()=>{
         addExtra();
         div.style.display = "block";
     }

    window.onclick = function(event) {
            if (event.target == div) {
                div.style.display = "none";
            }
        }

    td1.appendChild(button1);
    td1.appendChild(br);
    td1.appendChild(button2);
    td1.appendChild(br2);
    td1.appendChild(button3);
    for(let i=0;i<=6;i++){
        td2.appendChild(getScoreButton(i));
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    div6.appendChild(table);
    div6.appendChild(div);
}

export function createBody(){
    body.innerHTML = '';
    addLink();
    div1.id = "center";
    div2.id = "firstRow";
    div3.id = "secondRow";
    div4.id = "thirdRow";
    div5.id = "fourthRow";
    div6.id = "fifthRow";
    createTitle();
    createFirstRow();
    createSecondRow();
    createThirdRow();
    createFourthRow();
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
