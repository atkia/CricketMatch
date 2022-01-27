import * as players from './SelectOpeningPlayer.js' ;

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
    BattingTeamName,BowlingTeamName,
    tr = document.createElement('tr'),
    tr1 = document.createElement('tr'),
    tr2 = document.createElement('tr'),striker,nonStriker,bowler,battingTeam,bowlingTeam,
    count = 0;

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
    h3.innerText = "This over: ";
    div4.appendChild(h3);
}

function calculate(value){
    if(value=="wicket"){
        bowler.bowling.wickets++;
        let name = striker.playerName;
        alert(name +"is out");
        createBowlerTable();
        let span = document.createElement('span');
        span.id = 'out';
        span.innerText = 'out';
        document.getElementById('scoreTaken').appendChild(span);
    }

    if(value = 'noBall'){
        bowler.bowling.getRuns(1);
        let span = document.createElement('span');
        span.id = 'NB';
        span.innerText = 'NB';
        document.getElementById('scoreTaken').appendChild(span);
    }
}

function getCheckBox(value){
    let input = document.createElement('input');

    input.type = "checkbox";
    input.id =value;
    input.value = value;
    input.onclick=()=>{
        calculate(value);
    }
    return input;
}

function getLabel(value){
    let label = document.createElement('label');
    label.htmlFor = value;
    label.innerText = value;
    return label;
}

function createFourthRow(){
    let data = ['wide','noBall','byes','legByes','wicket'];
    for (let i=0;i<5;i++){
        div5.appendChild( getCheckBox(data[i]));
        div5.appendChild(getLabel(data[i]));
    }

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

function getScoreButton(value) {
    let input = document.createElement('input');
    input.type = 'button';
    input.className = 'button'
    input.value = value;

    input.onclick = () => {
        count++;
        console.log("c......"+count);
        let span = document.createElement('span');
        span.id = 'ball';
        span.innerText = value;
        document.getElementById('scoreTaken').appendChild(span);
        if (value % 2 != 0) {
            swapPlayer('odd');
            console.log("Swapped");
        }
        striker.batting.getRuns(value);
        striker.batting.ballNo++;
        striker.batting.sR();
        bowler.bowling.ballNo++;
        bowler.bowling.getOver();
        bowler.bowling.getRuns(value);
        document.getElementById('runScore').innerText = battingTeam.totalScore();
        console.log("player's SR: "+striker.batting.sR());
        if(value ==4){
            striker.batting.fours++;
        }
        if(value==6){
            striker.batting.sixs++;
        }
        table.innerHTML = '';
        createBattingPLayerTable();
        createBowlerTable();
        if(count==6){
            document.getElementById('scoreTaken').innerHTML = '';
            document.getElementById('scoreTaken').innerText = "This over";
            alert("one over is done!")
            count==0;
            console.log("c"+count);
        }
        console.log('table recreated');
        console.log(value);
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
