import * as players from './SelectOpeningPlayer.js' ;
import {addExtra, addModal, addPartnership} from './Extras.js';
import * as utils from './LocalStorageUtils.js';
import * as addPlayer from './AddPlayer.js';
import * as object from "./PlayerData.js";
import {addBowlerDiv} from "./AddBowler.js";
import * as elem from "./firstPage.js";
import {retire} from './retire.js';

let div1 = document.createElement('div'),
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
    tr2 = document.createElement('tr'),bowler,
    count = 0,byes,lB,NB,wide,inning,wicket;

export let bowlingTeam,battingTeam,striker,nonStriker,matchIndex;
let gameObject ;
let runningMatch,partnership;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
  //  head.innerHTML = '';
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/ScoreBoard.css";
    head.appendChild(link);
    return head;
}

function setInnings(){
    console.log(runningMatch.inningIndex);
    if(runningMatch.inningIndex==1){
        runningMatch.matchDetails = runningMatch.tossWonBy +' won the toss and opted to '+ runningMatch.optedTo + ' first.';
        utils.setItem('gameId',gameObject);
    }
    else{
        let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore+1;
        runningMatch.matchDetails = runningMatch.innings[1].battingTeam.teamName +' needs '+ winRun + ' run to win.';
        utils.setItem('gameId',gameObject);
    }
    inning = runningMatch.innings[runningMatch.inningIndex-1];
   // battingTeam = new object.team();
    if(inning.battingTeam.teamName && inning.bowlingTeam){}
    battingTeam = inning.battingTeam;
  //  console.log(battingTeam.getTotalOver());
    BattingTeamName = battingTeam.teamName;
    bowlingTeam = inning.bowlingTeam;
    BowlingTeamName = bowlingTeam.teamName;

    console.log(BowlingTeamName);
    striker = '';
    nonStriker = '';
    bowler = '';
}

function createSpan(id,innerText){
    let span = document.createElement('span');

    span.id = id;
    span.innerText = innerText;
    div2.appendChild(span);
}

function createFirstRow(){
    console.log('firstRow create');
       div2.innerHTML = '';
  //  }
    let br1 = document.createElement('br'),
        br2 = document.createElement('br'),
        spanT = document.createElement('span');
    let ballRemain = 0;
    let target = 0;
    console.log('after resume call: '+BowlingTeamName);
    createSpan("teamName", BattingTeamName);
    createSpan("",',');
    if(runningMatch.inningIndex==2){
        createSpan('innings','2nd inning');
        console.log(battingTeam.totalScore);

        target = runningMatch.innings[0].battingTeam.totalScore - battingTeam.totalScore;
        target = target+1;

        let totalMatchOver = +runningMatch.matchOvers*6;
        console.log(totalMatchOver);
        let totalBall =0;
        for(let i=0;i<bowlingTeam.players.length;i++){
             totalBall = totalBall+ bowlingTeam.players[i].bowling.ballNo;
        }
        ballRemain = totalMatchOver -totalBall;

        spanT.innerText = battingTeam.teamName +' need '+target +' run in '+ ballRemain +' balls.'
        spanT.id = 'targetText';


    }
    else{
        createSpan('innings','1st inning');
    }

    if(runningMatch.inningIndex==2) {
        createSpan('crr2','CRR');
        createSpan('target', 'Target');
        createSpan('rr', 'RR');
    }
    else{
        createSpan('crr','CRR');
    }
    div2.appendChild(br1);
    createSpan("runScore",battingTeam.totalScore);
    createSpan("scoreP","-");
    createSpan("wicket",battingTeam.wicket);
    createSpan('overB','(');
    createSpan('over',battingTeam.totalOver);
    createSpan('overB',')');

    if(runningMatch.inningIndex==2) {
        createSpan('crrValue2',battingTeam.crr);
        let target = runningMatch.innings[0].battingTeam.totalScore + 1;
        createSpan('targetValue', target);
        let rr = object.getRequiredRunRate(target,ballRemain);
        createSpan('rrValue',rr);
    }
    else{
        createSpan('crrValue',battingTeam.crr);
    }
    div2.appendChild(br2);
    div2.appendChild(spanT);
}

function createTitle(){
    headingDiv.innerHTML = '';
    let h1 = document.createElement('h1');
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
        hr = document.createElement('hr'),
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
    // tr.appendChild(hr);
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

function createStrikerDetailRow() {
    //if(inning.hostTeam.type == 'batting'){
    if (battingTeam.players.length==0) {
        console.log('striker is null.....');
        striker = new object.player(localStorage.getItem('Striker'),'batting');
        battingTeam.players.push(striker);
        nonStriker = new object.player(localStorage.getItem('Non Striker'),'batting');
        battingTeam.players.push(nonStriker);
        partnership = new object.partnership(striker.playerName,nonStriker.playerName);
        battingTeam.partnerShips.push(partnership);
        console.log('partnership added'+partnership);
        console.log("NonStrikerDetails:  " + nonStriker);
        utils.setItem('gameId',gameObject);
    }
    if(striker == '' && nonStriker == '' ){
        let playerNo = battingTeam.players.length - 1;
        striker = battingTeam.players[playerNo - 1];
        console.log("strikerDetails:  " + striker.playerName);
        nonStriker = battingTeam.players[playerNo];
        // partnership = new object.partnership(striker,nonStriker);
        // battingTeam.partnerShips.push(partnership);
        // console.log('partnership added');
        console.log("NonStrikerDetails:  " + nonStriker.playerName);
    }
    console.log("striker details:   " + striker.playerName);
    tr1 = changeBattingTableData(striker, '*', 'bat');
    tr2 = changeBattingTableData(nonStriker, '', 'bat');
}

function createBowlerDetailRow(){
    if(bowlingTeam.players.length ==0){
        bowler = new object.player(localStorage.getItem('Bowler'),'bowling');
        bowlingTeam.players.push(bowler);
        utils.setItem('gameId',gameObject);
    }
    else{
        let playerNo = bowlingTeam.players.length-1;
        bowler = bowlingTeam.players[playerNo];
    }

        tr = changeBattingTableData(bowler,'','bowler')
}

export function createBattingPLayerTable(){
    table.innerHTML = '';
    let tr = document.createElement('tr'),
        hr = document.createElement('hr');
    hr.id = 'batsmanHr';
    tr.appendChild(hr);
    table.appendChild(createTableHead('batsman'));
    table.appendChild(tr);
    createStrikerDetailRow();
    tr1.id = 'strikerDetails';
    //createNonStrikerDetailRow();
    tr2.id = 'nonStrikerDetails';
    table.appendChild(tr1);
    table.appendChild(tr2);

}

export function createBowlerTable(){
    table2.innerHTML ='';
    let hrTr = document.createElement('tr'),
        hr = document.createElement('hr');
    hr.id = 'bowlerHr';
    hrTr.appendChild(hr);
    table2.appendChild(createTableHead('bowler'));
    table2.appendChild(hrTr);
    createBowlerDetailRow();
    tr.id = 'bowlerDetails';
    table2.appendChild(tr);
}

function createSecondRow(){
    console.log('secondRow create')
    div3.innerHTML = '';
   // if(div3.hasChildNodes()==false){
        table.id = 'battingPLayerTable';
        createBattingPLayerTable();
        createBowlerTable();
        div3.appendChild(table);
        div3.appendChild(table2);
  //  }

}

function createThirdRow(){
    console.log('thirdRow create');
        div4.innerHTML = '';

        let ul = document.createElement('ul'),
            li1 = document.createElement('li'),
            li2 = document.createElement('li');

        ul.className = 'grid-container'
        ul.id = 'scoreList';
        li1.id = 'thisOver';
        li1.innerText = 'This over: ';
        ul.appendChild(li1);
        li2.id = 'scoreDetails';
        li2.className = 'Disabled';
        if(scoreTable.hasChildNodes()==true){
            scoreTable.innerHTML ='';
            if(scoreTR1.hasChildNodes()==true ){
                scoreTR1.innerHTML = '';
                scoreTR2.innerHTML = '';
            }
        }
        if(bowler.bowling.ballDetails.length!=0){
            if(bowler.bowling.ballDetails.length==6){
                let div = addBowlerDiv();
                document.getElementById('menuItems').appendChild(div);
                document.getElementById('form').style.display = 'none';
                let submit = document.getElementById('addBowlerButton');
                submit.onclick = ()=>{
                    elem.storeInputData();
                    changeBowler();
                    createBowlerTable();
                    document.getElementById('form').style.display = 'block';
                    div.remove();
                }
            }
            else{
                for(let i=0;i<bowler.bowling.ballDetails.length;i++){
                    let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
                    let button = document.createElement('button'),label = document.createElement('label');
                    let li = document.createElement('li');
                    label.id = 'scoreTag';
                    td1.id = 'scoreButton';
                    td2.id = 'scoreButton';
                    span.id = 'ball'+bowler.bowling.ballDetails[i].ballValue;
                    span.innerText = bowler.bowling.ballDetails[i].ballValue;
                    label.htmlFor = 'ball'+bowler.bowling.ballDetails[i].ballValue;
                    label.innerText =bowler.bowling.ballDetails[i].type;
                    td1.appendChild(span);
                    td2.appendChild(label);
                    scoreTR1.appendChild(td1);
                    scoreTR2.appendChild(td2);
                }
            }

        }
        scoreTable.appendChild(scoreTR1);
        scoreTable.appendChild(scoreTR2);
        li2.appendChild(scoreTable);
        ul.appendChild(li2);
        div4.appendChild(ul);
}

export function changePLayer(){
    console.log("2....")
    let name = localStorage.getItem('newBatsmanName');
    console.log(name);
    striker = '';
    striker = new object.player(name,'batting');
  //  runningMatch.innings[1].bowlingTeam.players.push(striker)
    battingTeam.players.push(striker);
    partnership = new object.partnership(striker.playerName,nonStriker.playerName);
    battingTeam.partnerShips.push(partnership);
    console.log('partnership added'+partnership);
    utils.setItem('gameId',gameObject);
     //= newPlayer;
    console.log('new Added Striker:   '+striker.playerName);
}

function addNewBatsMan(){
    let div = addPlayer.addBatsManDiv();
    headingDiv.style.display = 'none';
    div2.style.display = 'none';
    div3.style.display = 'none';
    div4.style.display = 'none';
    div5.style.display = 'none';
    div6.style.display = 'none';
    div1.appendChild(div);
    let submit = document.getElementById('addBatsmanButton');
    submit.onclick = ()=>{
        elem.storeInputData();
        changePLayer();
        createBattingPLayerTable();
        createBowlerTable();
        headingDiv.style.display = 'block';
        div2.style.display = 'block';
        div3.style.display = 'block';
        div4.style.display = 'block';
        div5.style.display = 'block';
        div6.style.display = 'block';
        div.remove();
    }

}

function calculate(value){
    if(value=="wicket"){
        wicket = true;
        battingTeam.wicket++;
         bowler.bowling.wickets++;
      //  striker.batting.changeStatus();
        console.log(striker.batting.status);
        striker.batting.status = object.changeStatus(striker.batting.status);
        utils.setItem('gameId',gameObject);
        document.getElementById('wicket').innerText = battingTeam.wicket;
        let td = document.createElement('td'),td2 = document.createElement('td');
        console.log("create Input field function called...")
        //addPlayer.createInputField();
        addNewBatsMan();

        let span = document.createElement('span'),span2 = document.createElement('span');
        span.id = 'out';
        span.innerText = 'out';
        td.appendChild(span);
        scoreTR1.appendChild(td);
        span2.innerText='';
        td2.appendChild(span2);
        scoreTR2.appendChild(td2);
    }

    if(value == 'NoBall'){
        NB=true;
       // bowler.bowling.getRuns(1);
        bowler.bowling.run = object.getRuns(bowler.bowling.run,1);
       // battingTeam.addPartnershipScore(1);
        battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,1);
        utils.setItem('gameId',gameObject);
        console.log("NB:   "+NB);
    }

    if(value =='byes' ){
        byes = true;


    }

    if(value =='legByes' ){
        lB = true;
    }

    if(value == 'wide'){
        wide = true;
      //  battingTeam.addPartnershipScore(1);
        battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,1);
        utils.setItem('gameId',gameObject);
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
    console.log('fourthRow create');
    div5.innerHTML = '';
        let data = ['wide', 'NoBall', 'byes', 'legByes', 'wicket'],
            button1 = document.createElement('button'),
            button2 = document.createElement('button');
        for (let i = 0; i < 5; i++) {
            div5.appendChild(getCheckBox(data[i]));
            div5.appendChild(getLabel(data[i]));
        }

        button1.id = 'retire';
        button1.innerText = "Retire";
        button1.onclick = () => {
            let tDiv = retire(battingTeam.teamName,bowlingTeam.teamName,striker.playerName,nonStriker.playerName);
            tDiv.id = 'retireDiv';
            document.getElementById('center').appendChild(tDiv);
            document.getElementById('menuItems').style.display = 'none';
            document.getElementById('scoreBoardDiv').style.display = 'none';

            document.getElementById('backArrow').onclick = ()=>{
                tDiv.remove();
                document.getElementById('menuItems').style.display = 'block';
                document.getElementById('scoreBoardDiv').style.display = 'block';
            }
            let submit = document.getElementById('done');
            submit.onclick = ()=>{
                console.log('submitted retire form');
                elem.storeInputData();
                tDiv.remove();
                document.getElementById('scoreBoardDiv').style.display = 'block';
                let retireBatsmanName = localStorage.getItem('retire');
                let replaceBy = localStorage.getItem('replaceBy');
                if(striker.playerName == retireBatsmanName){
                    striker.batting.retire = true;
                    striker = new object.player(replaceBy,'batting');
                    battingTeam.players.push(striker);
                    partnership = new object.partnership(striker.playerName,nonStriker.playerName);
                    battingTeam.partnerShips.push(partnership);
                    console.log('partnership added');
                }
                else{
                    nonStriker.batting.retire = true;
                    nonStriker = new object.player(replaceBy,'batting');
                    battingTeam.players.push(nonStriker);
                    partnership = new object.partnership(striker.playerName,nonStriker.playerName);
                    battingTeam.partnerShips.push(partnership);
                    console.log('partnership added');
                }
                utils.setItem('gameId', gameObject);
                createBattingPLayerTable();
            }
        }
        button2.id = 'swap';
        button2.innerText = "Swap Batsman";
        button2.onclick = () => {
            swapPlayer('odd');
            createBattingPLayerTable();
            console.log("Swap button work!!!")
        }
        div5.appendChild(button1);
        div5.appendChild(button2);
   // }
}

function changeBowler(){
    let name = localStorage.getItem('newBowlerName');
    console.log(name);
    bowler = '';
    bowler = new object.player(name,'bowling');
    //runningMatch.innings[1].battingTeam.players.push(bowler);
    bowlingTeam.players.push(bowler);
    utils.setItem('gameId',gameObject);
    //= newPlayer;
    console.log('new Added Striker:   '+bowler.playerName);
}

function checkOver(){
    console.log('checkOver function called')
    let div = addBowlerDiv();
    document.getElementById('scoreBoardDiv').style.display = 'none';
    document.getElementById('center').appendChild(div);
    let submit = document.getElementById('addBowlerButton');
    submit.onclick = ()=>{
        elem.storeInputData();
        changeBowler();
        createBowlerTable();
        document.getElementById('scoreBoardDiv').style.display = 'block';
        div.remove();

    }
    scoreTR1.innerHTML='';
    scoreTR2.innerHTML='';
}

function createCongoDiv(){
    let div = document.createElement('div'),
        div1 = document.createElement('div'),
        h1 = document.createElement('h1'),
        h2 = document.createElement('h1'),
        h3 = document.createElement('h3'),
        img = document.createElement('img');
    h1.id = 'congo';
    h1.innerText = 'Congratulations!';
    img.id = 'trophy';
    img.src = 'https://gclipart.com/wp-content/uploads/2017/02/Transparent-gold-cup-trophy-clipart-graphic-design-inspiration.png';
    div1.id = 'trophyDiv';
    div1.appendChild(img);
    h2.id = 'winnerTeamName';
    h3.id = 'winnerTeamDetails';
    div.appendChild(h1);
    div.appendChild(div1);
    div.appendChild(h2);
    div.appendChild(h3);
    div.id = 'congoDiv';
    return div;
}

function secondInnings(){
    console.log('2nd innings....');
    runningMatch.inningIndex = 2;
    utils.setItem('gameId',gameObject);
    setInnings();
    document.getElementById('scoreBoardDiv').style.display = 'none';
    document.getElementById('menuItems').style.display = 'none';
    let tempDiv = players.createDivs();
    document.getElementById('center').appendChild(tempDiv);
    let submitButton = document.getElementById("startMatch");
    document.getElementById('backArrow').onclick = ()=>{
        tempDiv.remove();
        document.getElementById('menuItems').style.display = 'block';
        document.getElementById('scoreBoardDiv').style.display = 'block';
        document.getElementById('modal').style.display = 'block';

    }
    submitButton.onclick = function (){
        elem.storeInputData(document.getElementById('player_form'));
        tempDiv.remove();
        document.getElementById('secondInningDiv').remove();
        document.getElementById('menuItems').style.display = 'block';
        document.getElementById('scoreBoardDiv').style.display = 'block';
        createTitle();
        createFirstRow();
        createSecondRow();
        createThirdRow();
        createFourthRow();
        createFifthRow();
    }
}

function secondInningConfirmDiv(){

    let div = document.createElement('div'),
        b = document.createElement('b'),
        p = document.createElement('p'),
        button1 = document.createElement('button'),
        button2 = document.createElement('button'),
        ball;
    div.innerHTML = '';
    ball =+runningMatch.matchOvers*6;
    b.innerText = 'End of the first inning.';
    p.innerText = bowlingTeam.teamName +' need '+battingTeam.totalScore+' runs in '+runningMatch.matchOvers+' overs'+'/n'+
                'Required Run Rate '+object.getRequiredRunRate(battingTeam.totalScore,ball);
    button1.id = 'cancel';
    button2.id = 'ok';
    button1.innerText = 'Cancel';
    button2.innerText = 'Ok';
    div.id = 'secondInningDiv';
    div.appendChild(b);
    div.appendChild(p);
    div.appendChild(button1);
    div.appendChild(button2);
    return div;
}

function newInning(){
    let div = addModal();
    let div22 = secondInningConfirmDiv();
    document.getElementById('content').appendChild(div22);
    div.style.display = "block";
    window.onclick = function (event) {
        if (event.target == div) {
            div.style.display = 'none';
             div22.remove();
            document.getElementById('retire').className = 'Disabled';
            document.getElementById('retire').style.backgroundColor = 'lightgray';;
            document.getElementById('swap').className = 'Disabled';
            document.getElementById('swap').style.backgroundColor = 'lightgray';
        }
    }
    document.getElementById('cancel').onclick=()=>{
        div.style.display = 'none';
         div22.remove();
        document.getElementById('retire').className = 'Disabled';
        document.getElementById('retire').style.backgroundColor = 'lightgray';;
        document.getElementById('swap').className = 'Disabled';
        document.getElementById('swap').style.backgroundColor = 'lightgray';
    }
    document.getElementById('ok').onclick=()=>{
        div.style.display = 'none';
        // div22.remove();
        secondInnings();
        document.getElementById('retire').className = 'activeNow';
        document.getElementById('swap').className = 'activeNow';
    }
}

function getScoreButton(value) {
    let input = document.createElement('input');
    input.type = 'button';
    input.className = 'button'
    input.value = value;

    input.onclick = () => {
        console.log('value');
        if(runningMatch.inningIndex==2) {
            let div = createCongoDiv();

            if (runningMatch.matchOvers == battingTeam.totalOver) {
                document.getElementById('center').appendChild(div);
                let h2 = document.getElementById('winnerTeamName'),
                    h3 = document.getElementById('winnerTeamDetails');
                if(runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore>runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore){
                    console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                    console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                    runningMatch.winnerTeamName = battingTeam.teamName;
                    runningMatch.losserTeamName = bowlingTeam.teamName;
                    h2.innerText = battingTeam.teamName;
                    let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
                    runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
                }
                else{
                    console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                    console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                    runningMatch.winnerTeamName =  runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                    runningMatch.losserTeamName = runningMatch.innings[runningMatch.inningIndex-2].bowlingTeam.teamName;
                    h2.innerText = runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                    let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore;
                    runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+winRun+' runs.';
                }
                h3.innerText = runningMatch.matchDetails;

                document.getElementById('scoreBoardDiv').style.display = 'none';
                runningMatch.matchStatus = 'finished';
                utils.setItem('gameId',gameObject);
            }
            else if(runningMatch.innings[1].battingTeam.totalScore==runningMatch.innings[0].battingTeam.totalScore+1){
                document.getElementById('center').appendChild(div);
                let h2 = document.getElementById('winnerTeamName'),
                    h3 = document.getElementById('winnerTeamDetails');
                runningMatch.winnerTeamName = battingTeam.teamName;
                runningMatch.losserTeamName = bowlingTeam.teamName;
                h2.innerText = battingTeam.teamName;
                let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
                h3.innerText = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
                // document.getElementById('center').appendChild(div);
                document.getElementById('scoreBoardDiv').style.display = 'none';
                runningMatch.matchStatus = 'finished';
                utils.setItem('gameId',gameObject);
            }
            else{
                console.log(striker.playerName);
                document.getElementById('wide').checked = false;
                document.getElementById('NoBall').checked = false;
                document.getElementById('byes').checked = false;
                document.getElementById('legByes').checked = false;
                document.getElementById('wicket').checked = false;
                let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
                td1.id = 'scoreButton';
                td2.id = 'scoreButton';
                span.id = 'ball'+value;
                span2.id = 'type'
                let label = document.createElement('label');
                let partnershipIndex = battingTeam.partnerShips.length-1;
                label.id = 'scoreTag';
                if(byes==true || lB == true || wide ==true){
                    span.innerText = '0';
                    td1.appendChild(span);
                    scoreTR1.appendChild(td1);
                    battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,value);
                    if(byes==true){
                        label.htmlFor = 'ball'+value;
                        label.innerText = value+'BYE';
                        battingTeam.extras.byes = object.addByes(battingTeam.extras.byes,value);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +value;
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        byes=false;
                        let ball = new object.ballDetail(0,value+'BYE');
                        bowler.bowling.ballDetails.push(ball);
                    }
                    if(lB==true){
                        label.htmlFor = 'ball'+value;
                        label.innerText = value+'LB';
                        battingTeam.extras.lByes = object.addLB(value,battingTeam.extras.lByes);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +value;
                        td2.appendChild(label);
                        scoreTR2.appendChild(td2);
                        console.log(span2);
                        lB = false;
                        let ball = new object.ballDetail(0,value+'LB');
                        bowler.bowling.ballDetails.push(ball);
                    }
                    if(wide==true){
                        let score = value+1;
                        label.htmlFor = 'ball'+value;
                        label.innerText = score+'WD';
                        battingTeam.extras.wB = object.addWB(battingTeam.extras.wB,score);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +score;
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(0,score+'WD');
                        bowler.bowling.ballDetails.push(ball);
                    }
                }
                else{
                    console.log(value);
                    span.innerText = value;
                    td1.appendChild(span);
                    scoreTR1.appendChild(td1);
                    if(NB==true){
                        let score = value+1;
                        // battingTeam.extras.addNB(1);
                        battingTeam.extras.noBall = object.addNB(battingTeam.extras.noBall,1);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +1;
                        //   battingTeam.addPartnershipScore(1);
                        label.htmlFor = 'ball'+value;
                        label.innerText = 'NB';
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(value,'NB');
                        bowler.bowling.ballDetails.push(ball);
                    }
                    else{
                        label.htmlFor = 'ball'+value;
                        label.innerText = '';
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(value,'');
                        if(bowler!=null){
                            bowler.bowling.ballDetails.push(ball);
                        }

                    }
                    striker.batting.run = object.getRuns(striker.batting.run,value);
                    if(battingTeam.partnerShips[partnershipIndex].player1Name == striker.playerName){
                        console.log(battingTeam.partnerShips[partnershipIndex].player1Name);
                        console.log(battingTeam.partnerShips[partnershipIndex].player2Name);
                        console.log('striker name: '+striker.playerName)
                        battingTeam.partnerShips[partnershipIndex].player1Run = battingTeam.partnerShips[partnershipIndex].player1Run+value;
                    }
                    else{
                        console.log(battingTeam.partnerShips[partnershipIndex].player1Name);
                        console.log(battingTeam.partnerShips[partnershipIndex].player2Name);
                        battingTeam.partnerShips[partnershipIndex].player2Run = battingTeam.partnerShips[partnershipIndex].player2Run+value;
                    }
                    bowler.bowling.run = object.getRuns(bowler.bowling.run,value);
                }
                if( wide!=true){
                    striker.batting.ballNo++;
                    if(battingTeam.partnerShips[partnershipIndex].player1Name == striker.playerName){
                        battingTeam.partnerShips[partnershipIndex].player1Ball++;
                    }
                    else{
                        battingTeam.partnerShips[partnershipIndex].player2Ball++;
                    }
                    if(NB!=true){
                        bowler.bowling.ballNo++;
                        bowler.bowling.er = object.eR(bowler.bowling.er,bowler.bowling.ballNo,bowler.bowling.run);
                        console.log(bowlingTeam.players.length);
                        battingTeam.crr = object.crr(bowlingTeam.players);
                        console.log(battingTeam.crr);
                        count++;
                    }

                }
                striker.batting.sr = object.sR(striker.batting.ballNo,striker.batting.sr,striker.batting.run);

                console.log(striker.batting.sr);
                bowler.bowling.overs = object.getOver(bowler.bowling.ballNo,bowler.bowling.overs);
                battingTeam.totalOver = object.getTotalOver(bowlingTeam.players);
                document.getElementById('over').innerText =''+battingTeam.totalOver;
                battingTeam.totalScore = object.getTotalScore(battingTeam.players,battingTeam.partnershipScore);
                document.getElementById('runScore').innerText =''+ battingTeam.totalScore;
                if (value % 2 != 0) {
                    swapPlayer('odd');
                    console.log("Swapped");
                }
                if(value ==4 && byes!=true && lB != true &&wide !=true){
                    striker.batting.fours++;
                }
                if(value==6&& byes!=true && lB != true &&wide !=true){
                    striker.batting.sixs++;
                }
                table.innerHTML = '';

                createFirstRow();
                createBattingPLayerTable();
                createBowlerTable();
                if(bowler.bowling.ballNo==6){
                    console.log(bowler.bowling.ballNo);
                    if(runningMatch.inningIndex==2) {
                        let div = createCongoDiv();
                        if (runningMatch.matchOvers == battingTeam.totalOver) {
                            document.getElementById('center').appendChild(div);
                            let h2 = document.getElementById('winnerTeamName'),
                                h3 = document.getElementById('winnerTeamDetails');
                            if(runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore>runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore){
                                console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                                console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                                runningMatch.winnerTeamName = battingTeam.teamName;
                                runningMatch.losserTeamName = bowlingTeam.teamName;
                                h2.innerText = battingTeam.teamName;
                                let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
                                runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
                            }
                            else{
                                console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                                console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                                runningMatch.winnerTeamName =  runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                                runningMatch.losserTeamName = runningMatch.innings[runningMatch.inningIndex-2].bowlingTeam.teamName;
                                h2.innerText = runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                                let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore;
                                runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+winRun+' runs.';
                            }
                            h3.innerText = runningMatch.matchDetails;

                            document.getElementById('scoreBoardDiv').style.display = 'none';
                            runningMatch.matchStatus = 'finished';
                            utils.setItem('gameId',gameObject);
                        }
                        else{
                            setTimeout(checkOver,500);
                        }
                    }

                    if(runningMatch.inningIndex==1){
                        if(runningMatch.matchOvers == battingTeam.totalOver){
                            newInning();
                        }
                        else{
                            setTimeout(checkOver,500);
                        }
                    }

                }
                console.log('after clicking run button:....'+gameObject);
                console.log(value);
                wide = false;
                NB=false;
                utils.setItem('gameId',gameObject);
            }
        }
        if(runningMatch.inningIndex==1){
            if(runningMatch.matchOvers == battingTeam.totalOver){
                // console.log('2nd innings....');
                // runningMatch.inningIndex = 2;
                // utils.setItem('gameId',gameObject);
                // setInnings();
                // document.getElementById('scoreBoardDiv').style.display = 'none';
                // let tempDiv = players.createDivs();
                // document.getElementById('menuItems').appendChild(tempDiv);
                // let submitButton = document.getElementById("startMatch");
                // submitButton.onclick = function (){
                //     elem.storeInputData(document.getElementById('player_form'));
                //     tempDiv.remove();
                //     document.getElementById('scoreBoardDiv').style.display = 'block';
                //     createTitle();
                //     createFirstRow();
                //     createSecondRow();
                //     createThirdRow();
                //     createFourthRow();
                //     createFifthRow();
                // }
                newInning();
            }
            else{
                document.getElementById('wide').checked = false;
                document.getElementById('NoBall').checked = false;
                document.getElementById('byes').checked = false;
                document.getElementById('legByes').checked = false;
                document.getElementById('wicket').checked = false;
                let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
                td1.id = 'scoreButton';
                td2.id = 'scoreButton';
                span.id = 'ball'+value;
                span2.id = 'type'
                let label = document.createElement('label');
                let partnershipIndex = battingTeam.partnerShips.length-1;
                label.id = 'scoreTag';
                if(byes==true || lB == true || wide ==true){
                    span.innerText = '0';
                    td1.appendChild(span);
                    scoreTR1.appendChild(td1);
                    battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,value);
                    if(byes==true){
                        label.htmlFor = 'ball'+value;
                        label.innerText = value+'BYE';
                        battingTeam.extras.byes = object.addByes(battingTeam.extras.byes,value);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +value;
                        // utils.setItem('gameId',gameObject);
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        byes=false;
                        let ball = new object.ballDetail(0,value+'BYE');
                        bowler.bowling.ballDetails.push(ball);
                    }
                    if(lB==true){
                        label.htmlFor = 'ball'+value;
                        label.innerText = value+'LB';
                        battingTeam.extras.lByes = object.addLB(value,battingTeam.extras.lByes);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +value;
                        td2.appendChild(label);
                        scoreTR2.appendChild(td2);
                        console.log(span2);
                        lB = false;
                        let ball = new object.ballDetail(0,value+'LB');
                        bowler.bowling.ballDetails.push(ball);
                    }
                    if(wide==true){
                        let score = value+1;
                        label.htmlFor = 'ball'+value;
                        label.innerText = score+'WD';
                        battingTeam.extras.wB = object.addWB(battingTeam.extras.wB,score);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +score;
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(0,score+'WD');
                        bowler.bowling.ballDetails.push(ball);
                    }
                }
                else{
                    console.log(value);
                    span.innerText = value;
                    td1.appendChild(span);
                    scoreTR1.appendChild(td1);
                    if(NB==true){
                        let score = value+1;
                        // battingTeam.extras.addNB(1);
                        battingTeam.extras.noBall = object.addNB(battingTeam.extras.noBall,1);
                        battingTeam.partnerShips[partnershipIndex].extra = battingTeam.partnerShips[partnershipIndex].extra +1;
                        label.htmlFor = 'ball'+value;
                        label.innerText = 'NB';
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(value,'NB');
                        bowler.bowling.ballDetails.push(ball);
                    }else{
                        label.htmlFor = 'ball'+value;
                        label.innerText = '';
                        td2.appendChild(label)
                        scoreTR2.appendChild(td2);
                        let ball = new object.ballDetail(value,'');
                        if(bowler!=null){
                            bowler.bowling.ballDetails.push(ball);
                        }

                    }
                    striker.batting.run = object.getRuns(striker.batting.run,value);
                    if(battingTeam.partnerShips[partnershipIndex].player1Name == striker.playerName){
                        console.log('striker name: '+striker.playerName);
                        console.log(battingTeam.partnerShips[partnershipIndex].player1Name );
                        console.log(battingTeam.partnerShips[partnershipIndex].player2Name );
                        battingTeam.partnerShips[partnershipIndex].player1Run = battingTeam.partnerShips[partnershipIndex].player1Run+value;
                    }
                    else{
                        battingTeam.partnerShips[partnershipIndex].player2Run = battingTeam.partnerShips[partnershipIndex].player2Run+value;
                    }
                    bowler.bowling.run = object.getRuns(bowler.bowling.run,value);
                }
                if( wide!=true){
                    striker.batting.ballNo++;
                    if(battingTeam.partnerShips[partnershipIndex].player1Name == striker.playerName){
                        battingTeam.partnerShips[partnershipIndex].player1Ball++;
                    }
                    else{
                        battingTeam.partnerShips[partnershipIndex].player2Ball++;
                    }
                    if(NB!=true){
                        bowler.bowling.ballNo++;
                        bowler.bowling.er = object.eR(bowler.bowling.er,bowler.bowling.ballNo,bowler.bowling.run);
                        console.log(bowlingTeam.players.length);
                        battingTeam.crr = object.crr(bowlingTeam.players);
                        console.log(battingTeam.crr);
                        count++;
                    }

                }
                striker.batting.sr = object.sR(striker.batting.ballNo,striker.batting.sr,striker.batting.run);
                console.log(striker.batting.sr);
                bowler.bowling.overs = object.getOver(bowler.bowling.ballNo,bowler.bowling.overs);
                battingTeam.totalOver = object.getTotalOver(bowlingTeam.players);
                document.getElementById('over').innerText =''+battingTeam.totalOver;
                battingTeam.totalScore = object.getTotalScore(battingTeam.players,battingTeam.partnershipScore);
                document.getElementById('runScore').innerText =''+ battingTeam.totalScore;
                if (value % 2 != 0) {
                    swapPlayer('odd');
                    console.log("Swapped");
                }
                if(value ==4 && byes!=true && lB != true &&wide !=true){
                    striker.batting.fours++;
                }
                if(value==6&& byes!=true && lB != true &&wide !=true){
                    striker.batting.sixs++;
                }
                table.innerHTML = '';
                createFirstRow();
                createBattingPLayerTable();
                createBowlerTable();
                if(bowler.bowling.ballNo==6){
                    console.log(bowler.bowling.ballNo);
                    if(runningMatch.inningIndex==2) {
                        let div = createCongoDiv();
                        if (runningMatch.matchOvers == battingTeam.totalOver) {
                            document.getElementById('center').appendChild(div);
                            let h2 = document.getElementById('winnerTeamName'),
                                h3 = document.getElementById('winnerTeamDetails');
                            if(runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore>runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore){
                                console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                                console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                                runningMatch.winnerTeamName = battingTeam.teamName;
                                runningMatch.losserTeamName = bowlingTeam.teamName;
                                h2.innerText = battingTeam.teamName;
                                let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
                                runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
                            }
                            else{
                                console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
                                console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
                                runningMatch.winnerTeamName =  runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                                runningMatch.losserTeamName = runningMatch.innings[runningMatch.inningIndex-2].bowlingTeam.teamName;
                                h2.innerText = runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
                                let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore;
                                runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+winRun+' runs.';
                            }
                            h3.innerText = runningMatch.matchDetails;

                            document.getElementById('scoreBoardDiv').style.display = 'none';
                            runningMatch.matchStatus = 'finished';
                            utils.setItem('gameId',gameObject);
                        }
                        else{
                            setTimeout(checkOver,500);
                        }
                    }

                    if(runningMatch.inningIndex==1){
                        if(runningMatch.matchOvers == battingTeam.totalOver){
                            newInning();
                        }
                        else{
                            setTimeout(checkOver,500);
                        }
                    }

                }
                console.log('after clicking run button:....'+gameObject);
                console.log(value);
                wide = false;
                NB=false;
                utils.setItem('gameId',gameObject);
            }
        }
        // document.getElementById('wide').checked = false;
        // document.getElementById('NoBall').checked = false;
        // document.getElementById('byes').checked = false;
        // document.getElementById('legByes').checked = false;
        // document.getElementById('wicket').checked = false;
        // let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
        // td1.id = 'scoreButton';
        // td2.id = 'scoreButton';
        // span.id = 'ball'+value;
        // span2.id = 'type'
        // let label = document.createElement('label');
        // label.id = 'scoreTag';
        //     if(byes==true || lB == true || wide ==true){
        //         span.innerText = '0';
        //         td1.appendChild(span);
        //         scoreTR1.appendChild(td1);
        //         battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,value);
        //         if(byes==true){
        //             label.htmlFor = 'ball'+value;
        //             label.innerText = value+'BYE';
        //             battingTeam.extras.byes = object.addByes(battingTeam.extras.byes,value);
        //             td2.appendChild(label)
        //             scoreTR2.appendChild(td2);
        //             byes=false;
        //             let ball = new object.ballDetail(0,value+'BYE');
        //             bowler.bowling.ballDetails.push(ball);
        //         }
        //         if(lB==true){
        //             label.htmlFor = 'ball'+value;
        //             label.innerText = value+'LB';
        //             battingTeam.extras.lByes = object.addLB(value,battingTeam.extras.lByes);
        //             td2.appendChild(label);
        //             scoreTR2.appendChild(td2);
        //             console.log(span2);
        //             lB = false;
        //             let ball = new object.ballDetail(0,value+'LB');
        //             bowler.bowling.ballDetails.push(ball);
        //         }
        //         if(wide==true){
        //             let score = value+1;
        //             label.htmlFor = 'ball'+value;
        //             label.innerText = score+'WD';
        //             battingTeam.extras.wB = object.addWB(battingTeam.extras.wB,score);
        //             td2.appendChild(label)
        //             scoreTR2.appendChild(td2);
        //             let ball = new object.ballDetail(0,score+'WD');
        //             bowler.bowling.ballDetails.push(ball);
        //         }
        //     }
        //     else{
        //         console.log(value);
        //         span.innerText = value;
        //         td1.appendChild(span);
        //         scoreTR1.appendChild(td1);
        //         if(NB==true){
        //             let score = value+1;
        //             // battingTeam.extras.addNB(1);
        //             battingTeam.extras.noBall = object.addNB(battingTeam.extras.noBall,1);
        //             //   battingTeam.addPartnershipScore(1);
        //             label.htmlFor = 'ball'+value;
        //             label.innerText = 'NB';
        //             td2.appendChild(label)
        //             scoreTR2.appendChild(td2);
        //             let ball = new object.ballDetail(value,'NB');
        //             bowler.bowling.ballDetails.push(ball);
        //         }else{
        //             label.htmlFor = 'ball'+value;
        //             label.innerText = '';
        //             td2.appendChild(label)
        //             scoreTR2.appendChild(td2);
        //             let ball = new object.ballDetail(value,'');
        //             if(bowler!=null){
        //                 bowler.bowling.ballDetails.push(ball);
        //             }
        //
        //         }
        //         striker.batting.run = object.getRuns(striker.batting.run,value);
        //         bowler.bowling.run = object.getRuns(bowler.bowling.run,value);
        //     }
        //     if( wide!=true){
        //         striker.batting.ballNo++;
        //         if(NB!=true){
        //             bowler.bowling.ballNo++;
        //             bowler.bowling.er = object.eR(bowler.bowling.er,bowler.bowling.ballNo,bowler.bowling.run);
        //             console.log(bowlingTeam.players.length);
        //             battingTeam.crr = object.crr(bowlingTeam.players);
        //             console.log(battingTeam.crr);
        //             count++;
        //         }
        //
        //     }
        //     striker.batting.sr = object.sR(striker.batting.ballNo,striker.batting.sr,striker.batting.run);
        //     console.log(striker.batting.sr);
        //     bowler.bowling.overs = object.getOver(bowler.bowling.ballNo,bowler.bowling.overs);
        //     battingTeam.totalOver = object.getTotalOver(bowlingTeam.players);
        //     document.getElementById('over').innerText =''+battingTeam.totalOver;
        //     battingTeam.totalScore = object.getTotalScore(battingTeam.players,battingTeam.partnershipScore);
        //     document.getElementById('runScore').innerText =''+ battingTeam.totalScore;
        //     if (value % 2 != 0) {
        //         swapPlayer('odd');
        //         console.log("Swapped");
        //     }
        //     if(value ==4 && byes!=true && lB != true &&wide !=true){
        //         striker.batting.fours++;
        //     }
        //     if(value==6&& byes!=true && lB != true &&wide !=true){
        //         striker.batting.sixs++;
        //     }
        //     table.innerHTML = '';
        //     createFirstRow();
        //     createBattingPLayerTable();
        //     createBowlerTable();
        //     if(bowler.bowling.ballNo==6){
        //         console.log(bowler.bowling.ballNo);
        //         if(runningMatch.inningIndex==2) {
        //             let div = createCongoDiv();
        //             if (runningMatch.matchOvers == battingTeam.totalOver) {
        //                 document.getElementById('center').appendChild(div);
        //                 let h2 = document.getElementById('winnerTeamName'),
        //                     h3 = document.getElementById('winnerTeamDetails');
        //                 if(runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore>runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore){
        //                     console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
        //                     console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
        //                     runningMatch.winnerTeamName = battingTeam.teamName;
        //                     runningMatch.losserTeamName = bowlingTeam.teamName;
        //                     h2.innerText = battingTeam.teamName;
        //                     let wicketSaved = 10- +runningMatch.innings[1].battingTeam.wicket;
        //                     runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+wicketSaved+' wickets.';
        //                 }
        //                 else{
        //                     console.log('totalScore of running batting team: '+runningMatch.innings[runningMatch.inningIndex-1].battingTeam.totalScore);
        //                     console.log('totalScore of previous batting team: '+runningMatch.innings[runningMatch.inningIndex-2].battingTeam.totalScore);
        //                     runningMatch.winnerTeamName =  runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
        //                     runningMatch.losserTeamName = runningMatch.innings[runningMatch.inningIndex-2].bowlingTeam.teamName;
        //                     h2.innerText = runningMatch.innings[runningMatch.inningIndex-2].battingTeam.teamName;
        //                     let winRun = runningMatch.innings[0].battingTeam.totalScore-runningMatch.innings[1].battingTeam.totalScore;
        //                     runningMatch.matchDetails = runningMatch.winnerTeamName + ' won by '+winRun+' runs.';
        //                 }
        //                 h3.innerText = runningMatch.matchDetails;
        //
        //                 document.getElementById('scoreBoardDiv').style.display = 'none';
        //                 runningMatch.matchStatus = 'finished';
        //                 utils.setItem('gameId',gameObject);
        //             }
        //             else{
        //                 setTimeout(checkOver,500);
        //             }
        //         }
        //
        //         if(runningMatch.inningIndex==1){
        //             if(runningMatch.matchOvers == battingTeam.totalOver){
        //                 newInning();
        //             }
        //             else{
        //                 setTimeout(checkOver,500);
        //             }
        //         }
        //
        //     }
        //      console.log('after clicking run button:....'+gameObject);
        //      console.log(value);
        //     wide = false;
        //     NB=false;
        // utils.setItem('gameId',gameObject);
        }
    return input;
}

function createFifthRow(){
    console.log('fifthRow create');
    div6.innerHTML = '';
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
            div = document.createElement('div');;
        td1.id = 'leftSide';
        button1.id = 'undo';
        button1.innerText = 'Undo';
        button1.onclick = () => {
        };
        button2.id = 'partnership';
        button2.innerText = 'Partnership';
        div = addModal();
        button2.onclick = () => {
            // div2.innerHTML = '';

            let div22 = addPartnership();
            document.getElementById('content').appendChild(div22);
            div.style.display = "block";
        }
        button3.id = 'extras';
        button3.innerText = "Extras";
        //  div2 = addModal();
        button3.onclick = () => {
            // div2.innerHTML = '';
            let div22 = addExtra();
            document.getElementById('content').appendChild(div22);
            div.style.display = "block";
        }
        window.onclick = function (event) {
            if (event.target == div) {
                div.style.display = "none";
            }
        }

        td1.appendChild(button1);
        td1.appendChild(br);
        td1.appendChild(button2);
        td1.appendChild(br2);
        td1.appendChild(button3);
        td2.id = 'scoreButtonColumn';
        for (let i = 0; i <= 6; i++) {
            td2.appendChild(getScoreButton(i));
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        div6.appendChild(table);
        div6.appendChild(div);
        // div6.appendChild(div2);
}

export function createBody(matchIndex){
    matchIndex = matchIndex;
    gameObject = utils.getItem('gameId');
    console.log('matchIndex got:  '+matchIndex+'game object er length:'+gameObject.matches.length);
    for(let i=0;i<gameObject.matches.length;i++){
        console.log('i....'+i);
        console.log(gameObject.matches[i].matchIndex);
        if(gameObject.matches[i].matchIndex==matchIndex){
            runningMatch = gameObject.matches[i];

            console.log(runningMatch.innings[0]);
        }
    }
    console.log("create body function called....")
    setInnings();
    addLink();
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
    return div1;
}