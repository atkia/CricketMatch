import * as utils from "./LocalStorageUtils.js";
import * as object from "./PlayerData.js";
import {createSpan} from "./PlayerDetails.js";
let gameObject,MatchIndex,runningMatch,div = document.createElement('div');
let headingDiv = document.createElement('div');
function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/scoreBoardOfMatch.css";
    head.appendChild(link);
    return head
}
function createTitle(){
    headingDiv.innerHTML = '';
    let span = document.createElement('span'),img = document.createElement('img');
    img.src = 'https://pixabay.com/static/uploads/photo/2012/04/15/21/34/arrow-35386_960_720.png';
    img.id = 'backArrow';
    span.innerText = runningMatch.innings[0].battingTeam.teamName+" v/s "+runningMatch.innings[0].bowlingTeam.teamName;
    headingDiv.id = "title";
    headingDiv.appendChild(img);
    headingDiv.appendChild(span);
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
        console.log(player.batting.run);
        td3.innerText = player.batting.ballNo;
        console.log(player.batting.ballNo);
        td4.innerText =player.batting.fours;
        td5.innerText = player.batting.sixs;
        td6.innerText = player.batting.sr;
    }
    else{
        td2.innerText = player.bowling.overs;
        td3.innerText = player.bowling.maiden;
        td4.innerText = player.bowling.run;
        td5.innerText = player.bowling.wickets;
        td6.innerText = player.bowling.er;
    }

    tr.appendChild( td1);
    tr.appendChild( td2);
    tr.appendChild( td3);
    tr.appendChild( td4);
    tr.appendChild( td5);
    tr.appendChild( td6);
    return tr;
}
function createBatsmanStatusRow(batsman) {
    let tr = document.createElement('tr'),td = document.createElement('td');
    td.innerText = batsman.batting.status;
    td.id = 'batsmanStatus';
    tr.appendChild(td);
    return tr;
}

function createHr(){
    let hr = document.createElement('hr');
    return hr;
}

function createStrikerDetailRow(index) {
        let playerNo = runningMatch.innings[index].battingTeam.players.length ;
    let trs = [];

    for(let i=0;i<playerNo;i++){
        let batsman = runningMatch.innings[index].battingTeam.players[i];
        trs.push(changeBattingTableData(batsman,'','bat'));
        trs.push(createBatsmanStatusRow(batsman));
        trs.push(createHr());
    }
    return trs;
}

function overDetails(bowler,i,balls){
    i= i+1;
    let batsmanNames = [];

    let overDiv = document.createElement('div'),
        scoreTable = document.createElement('table'),
        scoreTR1 = document.createElement('tr'),
        scoreTR2 = document.createElement('tr'),
        span1 = document.createElement('span'),
        span2 = document.createElement('span'),
        ul = document.createElement('ul'),
        li1 = document.createElement('li'),
        li2 = document.createElement('li');

    ul.className = 'grid-container'
    ul.id = 'scoreList';

    console.log(balls.length);
    for(let c=0;c<balls.length;c++){
      batsmanNames.push(balls[c].batsmanName);
    }
    let uniqueNames = [...new Set(batsmanNames)];
    for(let c=0;c<uniqueNames.length;c++){
        console.log(uniqueNames[c]);
    }
    span1.id = 'overNo';
    span2.id = 'players';
    span1.innerText = 'Ov '+i;
    if(uniqueNames.length==2){
        span2.innerText = bowler.playerName +' to ' +uniqueNames[0] +','+uniqueNames[1];
    }
    else{
        span2.innerText = bowler.playerName +' to ' +uniqueNames[0] ;
    }
    overDiv.appendChild(span1);
    overDiv.appendChild(span2);
    li1.id = 'givenRun';
    li1.innerText = bowler.bowling.run +'Runs';
    for(let c=0;c<balls.length;c++){
        let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
        let label = document.createElement('label');

        label.id = 'scoreTags';
        td1.id = 'scoreButton';
        td2.id = 'scoreButton';
        span.id = 'sball'+balls[c].ballValue;
        span.innerText = balls[c].ballValue;
        label.htmlFor = 'sball'+balls[c].ballValue;
        label.innerText =balls[c].type;
        td1.appendChild(span);
        td2.appendChild(label);
        scoreTR1.appendChild(td1);
        scoreTR2.appendChild(td2);
    }
    scoreTable.appendChild(scoreTR1);
    scoreTable.appendChild(scoreTR2);
    li2.appendChild(scoreTable);
    ul.appendChild(li1);
    ul.appendChild(li2);
    overDiv.appendChild(ul);
    overDiv.id = 'overDiv';
    console.log(overDiv);
    return overDiv;
   // document.getElementById('center').appendChild(table);
}
function overCount(bowler,allBalls){
    console.log(allBalls.length)
   let overs = object.overCount(allBalls),overNo = [], overDivs= [];
   console.log(bowler.playerName);
   console.log(overs.length);
   for(let i=0;i<overs.length;i++){
       console.log(overs[i]);
       overNo.push(i);
       let tdiv = overDetails(bowler,i,overs[i].ball);
       console.log(tdiv);
       overDivs.push(tdiv);
   }
   console.log(overDivs[0]);
   return overDivs;
}

function createBowlerDetailRow(index){
        let playerNo = runningMatch.innings[index].bowlingTeam.players.length;
        let trs = [];
        for(let i=0;i<playerNo;i++){
            let bowler = runningMatch.innings[index].bowlingTeam.players[i];
            trs.push(changeBattingTableData(bowler,'','bowler'));
            let overDivs = overCount(bowler,bowler.bowling.ballDetails);

            for (let j=0;j<overDivs.length;j++){
                let tr = document.createElement('tr'),td = document.createElement('td');
                td.id = 'overTd'
                td.colSpan = 6;
                td.appendChild(overDivs[j]);
                tr.appendChild(td);
                trs.push(tr);
            }

            trs.push(createHr());
        }
        for(let i=0;i<trs.length;i++){
            console.log(trs[i]);
        }
   return trs;
}

function addExtra(index){
    let div = document.createElement('div'),
        ul = document.createElement('ul'),
        li1 = document.createElement('li'),
        li2 = document.createElement('li');
    ul.id = 'extraUl';
    li1.innerText = 'Extras';
    li1.id = 'extraTitle';
    li2.id = 'extraDetails';
    li2.innerText = runningMatch.innings[index].battingTeam.partnershipScore+' '+runningMatch.innings[index].battingTeam.extras.byes +' B, '+runningMatch.innings[index].battingTeam.extras.lByes +' LB, '+runningMatch.innings[index].battingTeam.extras.wB +' WB, '+runningMatch.innings[index].battingTeam.extras.noBall +' NB, '+runningMatch.innings[index].battingTeam.extras.penalty +' P';
    ul.appendChild(li1);
    ul.appendChild(li2);
    div.appendChild(ul);
    let hr = createHr();
    hr.id = 'extrasHr';
    div.appendChild(hr);
    return div;
}

function addTotal(index){
    let div = document.createElement('div'),
        ul = document.createElement('ul'),
        li1 = document.createElement('li'),
        li2 = document.createElement('li');
    ul.id = 'totalUl';
    li1.innerText = 'Total';
    li1.id = 'totalTitle';
    li2.id = 'totalDetails';
    li2.innerText = runningMatch.innings[index].battingTeam.totalScore+'-'+runningMatch.innings[index].battingTeam.wicket +' ('+runningMatch.innings[index].battingTeam.totalOver+')  '+runningMatch.innings[index].battingTeam.crr;
    ul.appendChild(li1);
    ul.appendChild(li2);
    div.appendChild(ul);
    let hr = createHr();
    hr.id = 'totalsHr';
    div.appendChild(hr);
    return div;
}

export function createBattingPLayerTable(index,table){
    table.innerHTML = '';

    table.appendChild(createTableHead('batsman'));
    let trs = createStrikerDetailRow(index);
    for(let i=0;i<trs.length;i++){
        table.appendChild(trs[i]);
    }
    return table;
}

export function createBowlerTable(index,table2){
    table2.innerHTML ='';
    table2.appendChild(createTableHead('bowler'));
    let trs = createBowlerDetailRow(index);
    for(let i=0;i<trs.length;i++){
        table2.appendChild(trs[i]);
    }
    return table2;
}

function createSecondRow(index){
    let div3 = document.createElement('div'),
        table = document.createElement('table'),
    table2 = document.createElement('table');
    console.log('secondRow create');
    div3.id = 'scoreDetailsDiv'+index;
    div3.innerHTML = '';
    table.id = 'battingPLayerTable';
    div3.appendChild(createBattingPLayerTable(index,table));
    div3.appendChild(addExtra(index));
    div3.appendChild(addTotal(index));
    div3.appendChild(createBowlerTable(index,table2));
    div3.style.display = 'none';
    return div3;

}
function createTeamHeading(index){
    let inning = runningMatch.innings[index],
        div1 = document.createElement('div'),
        div2 = document.createElement('div'),
        ul = document.createElement('ul'),
        li1 = document.createElement('li'),
        li2 = document.createElement('li'),
        li3 = document.createElement('li'),
        upImg = document.createElement('img'),
        downImg = document.createElement('img');
    div1.id = 'teamHeading';
    ul.id = 'listOfTeamHeading';
    li1.id = 'teamName';
    li1.innerText = inning.battingTeam.teamName;
    li2.id = 'scoreWicketOver';
    li2.innerText = inning.battingTeam.totalScore+'-'+inning.battingTeam.wicket +'('+inning.battingTeam.totalOver+')';
    upImg.src = 'https://www.freeiconspng.com/uploads/white-down-arrow-png-2.png';
    upImg.id = 'upImg';
    downImg.id = 'downImg';
    downImg.src = 'https://www.freeiconspng.com/uploads/white-down-arrow-png-2.png';
    upImg.onclick=()=>{
        li3.innerHTML = '';
        li3.appendChild(downImg);
        document.getElementById('scoreDetailsDiv'+index).style.display = 'none';
    }
    downImg.onclick=()=>{
        li3.innerHTML = '';
        li3.appendChild(upImg);
        document.getElementById('scoreDetailsDiv'+index).style.display = 'block';
    }
    li3.appendChild(downImg);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    div1.appendChild(ul);
    return div1;
}

function createFirstInningDiv(){
    div.appendChild(createTeamHeading(0));
    div.appendChild(createSecondRow(0));

}

function createSecondInningDiv(){
    div.appendChild(createTeamHeading(1));
    div.appendChild(createSecondRow(1));
}

export function createScoreBoardDiv(matchIndex){
    div.innerHTML = '';
    addLink();
    MatchIndex = matchIndex;
    gameObject = utils.getItem('gameId');
    console.log('matchIndex got:  '+matchIndex+'game object er length:'+gameObject.matches.length);
    for(let i=0;i<gameObject.matches.length;i++){
        console.log('i....'+i);
        console.log(gameObject.matches[i].matchIndex);
        if(gameObject.matches[i].matchIndex==matchIndex){
            runningMatch = gameObject.matches[i];
            console.log(runningMatch.inningIndex);
        }
    }
    createTitle();
    div.appendChild(headingDiv);
    if(runningMatch.inningIndex==1){
        let h2 = document.createElement('h2');
        h2.innerText = runningMatch.tossWonBy + ' won the toss and opted to '+runningMatch.optedTo+' first.';
        div.appendChild(h2);
        createFirstInningDiv();
    }
    else{
        let h2 = document.createElement('h2');
        console.log('2nd innings is running');
        if(runningMatch.matchStatus =='finished'){
            if(runningMatch.winnerTeamName == runningMatch.innings[1].battingTeam.teamName){
                let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
                h2.innerText = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
            }
            else{
                let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore;
                h2.innerText = runningMatch.winnerTeamName + ' won by '+winRun+' runs.';
            }
        }
        else{
            console.log('match is running')
            let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore+1;
            // let h2 = document.createElement('h2');
            h2.innerText = runningMatch.innings[1].battingTeam.teamName + ' needs '+winRun+' to win.';

        }

        div.appendChild(h2);
        createFirstInningDiv();
        createSecondInningDiv();
    }
    return div;
}