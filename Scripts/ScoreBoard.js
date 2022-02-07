// import * as players from './SelectOpeningPlayer.js' ;
import {addExtra, addModal, addPartnership} from './Extras.js';
import * as utils from './LocalStorageUtils.js';
import * as addPlayer from './AddPlayer.js';
import * as object from "./PlayerData.js";
// import {createMenuItems} from "./firstPage.js";
import * as getTeam from "./Teams.js";
import {history} from "./history.js";
import {match} from "./PlayerData.js";

let body = document.getElementsByTagName('body')[0],
    div0 = document.createElement('div'),
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
    tr2 = document.createElement('tr'),bowler,
    count = 0,byes,lB,NB,wide,inning,wicket;

export let bowlingTeam,battingTeam,striker,nonStriker,matchIndex;
let gameObject ;
let runningMatch;

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
    console.log(runningMatch.innings[0]);
    inning = runningMatch.innings[runningMatch.inningIndex-1];
   // battingTeam = new object.team();
    battingTeam = inning.battingTeam;
  //  console.log(battingTeam.getTotalOver());
    BattingTeamName = battingTeam.teamName;
    // bowlingTeam = new object.team();
    bowlingTeam = inning.bowlingTeam;
    console.log(battingTeam.players[0].playerName);
    console.log(bowlingTeam.players[0].playerName);
    BowlingTeamName = bowlingTeam.teamName;
    console.log(BowlingTeamName);
}
//
// function getBattingName(){
//     let tossWonBy = localStorage.getItem('tossWonBy');
//
//     if(tossWonBy == 'HostTeam'){
//         BattingTeamName = localStorage.getItem('Host Name');
//         battingTeam = inning.hostTeam;
//         BowlingTeamName = localStorage.getItem('Visitor Name');
//         bowlingTeam = inning.visitorTeam;
//     }
//     else{
//         BowlingTeamName = localStorage.getItem('Host Name');
//        bowlingTeam = inning.hostTeam;
//         BattingTeamName = localStorage.getItem('Visitor Name');
//         battingTeam = inning.visitorTeam;
//     }
//
// }

// function setMenuItems(){
//     if(div0.hasChildNodes()==false) {
//         div0.appendChild(createMenuItems());
//     }
// }

function createSpan(id,innerText){
    let span = document.createElement('span');

    span.id = id;
    span.innerText = innerText;
    div2.appendChild(span);
}


function createFirstRow(){

   // if(div2.hasChildNodes()==true){
        // if(players.inningIndex!=1){
        //     document.getElementById('innings').innerText = '2nd innings';
        //
        // }
       div2.innerHTML = '';
  //  }
    let br = document.createElement('br');
    console.log('after resume call: '+BowlingTeamName);
    createSpan("teamName", BattingTeamName);
    createSpan("",',');
    createSpan('innings','1st inning');
    div2.appendChild(br);
    createSpan("runScore",battingTeam.totalScore);
    createSpan("scoreP","-");
    createSpan("wicket",battingTeam.wicket);
    createSpan('overB','(');
    createSpan('over',battingTeam.totalOver);
    createSpan('overB',')');

}

function createTitle(){
    headingDiv.innerHTML = '';
    let h1 = document.createElement('h1');

    //getBattingName();
    //if(headingDiv.hasChildNodes()==false){
        h1.innerText = BattingTeamName+" v/s "+BowlingTeamName;
        headingDiv.id = "title";
        headingDiv.appendChild(h1);
   // }


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
  //  if (striker == null && nonStriker == null) {
  //      console.log('striker is null.....');
        let playerNo = battingTeam.players.length - 1;
        striker = battingTeam.players[playerNo - 1];
        console.log("strikerDetails:  " + striker);
        nonStriker = battingTeam.players[playerNo];
        console.log("NonStrikerDetails:  " + nonStriker);

  //  }
 //   console.log("striker details:   " + striker.playerName);
    tr1 = changeBattingTableData(striker, '*', 'bat');
    tr2 = changeBattingTableData(nonStriker, '', 'bat');
}
function createBowlerDetailRow(){
  //  if(inning.hostTeam.type == 'bowling'){
        let playerNo = bowlingTeam.players.length-1;
        bowler = bowlingTeam.players[playerNo];
        tr = changeBattingTableData(bowler,'','bowler')
}

export function createBattingPLayerTable(){
    table.innerHTML = '';
    table.appendChild(createTableHead('batsman'));
    createStrikerDetailRow();
    tr1.id = 'strikerDetails';
    //createNonStrikerDetailRow();
    tr2.id = 'nonStrikerDetails';
    table.appendChild(tr1);
    table.appendChild(tr2);

}

export function createBowlerTable(){
    table2.innerHTML ='';
    table2.appendChild(createTableHead('bowler'));
    createBowlerDetailRow();
    tr.id = 'bowlerDetails';
    table2.appendChild(tr);
}

function createSecondRow(){
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
    //if(div4.hasChildNodes()==false) {
        div4.innerHTML = '';

        let ul = document.createElement('ul'),
            li1 = document.createElement('li'),
            li2 = document.createElement('li');

        li1.id = 'thisOver';
        li1.innerText = 'This over: ';
        ul.appendChild(li1);
        li2.id = 'scoreDetails';
        // let h3 = document.createElement('h3'),
        //     div1 = document.createElement('div'),
        //     div2 = document.createElement('div'),
        //     div3 = document.createElement('div');

       // h3.id = "scoreTaken";
       // h3.innerText = "This over:  ";
       //div1.appendChild(h3);
        if(scoreTable.hasChildNodes()==true){
            scoreTable.innerHTML ='';
            if(scoreTR1.hasChildNodes()==true ){
                scoreTR1.innerHTML = '';
                scoreTR2.innerHTML = '';
            }
        }
    // let td = document.createElement('td');
    // td.id = 'thisOver';
    // td.rowSpan = 2;
    // td.innerText = "This over:  ";
    // scoreTR1.appendChild(td);
        if(bowler.bowling.ballDetails.length!=0){
            for(let i=0;i<bowler.bowling.ballDetails.length;i++){
                let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
                 let button = document.createElement('button'),label = document.createElement('label');
                 let li = document.createElement('li');
                // button.id = 'ball'+bowler.bowling.ballDetails[i].ballValue;
                 label.id = 'scoreTag';
                // button.innerText = bowler.bowling.ballDetails[i].ballValue;
                // label.innerText = bowler.bowling.ballDetails[i].type;
                td1.id = 'scoreButton';
                td2.id = 'scoreButton';

                span.id = 'ball'+bowler.bowling.ballDetails[i].ballValue;
               // span2.id = 'type';
                span.innerText = bowler.bowling.ballDetails[i].ballValue;
                label.htmlFor = 'ball'+bowler.bowling.ballDetails[i].ballValue;
                label.innerText =bowler.bowling.ballDetails[i].type;
               // span2.innerText = bowler.bowling.ballDetails[i].type;
                td1.appendChild(span);
                td2.appendChild(label);
                scoreTR1.appendChild(td1);
                scoreTR2.appendChild(td2);
                // div2.appendChild(button);
                // div2.appendChild()
            }
        }

        scoreTable.appendChild(scoreTR1);
        scoreTable.appendChild(scoreTR2);
       // h3.appendChild(scoreTable);
        li2.appendChild(scoreTable);
        ul.appendChild(li2);
        div4.appendChild(ul);
 //   }
}
export function changePLayer(){
    console.log("2....")
    let name = localStorage.getItem('NewPlayerName');
    console.log(name);
    striker = '';
    striker = new object.player(name,'batting');
    battingTeam.players.push(striker);
    utils.setItem('gameId',gameObject);
     //= newPlayer;
    console.log('new Added Striker:   '+striker.playerName);
   // table.removeChild(document.getElementById('strikerDetails'));

 //   document.getElementById('strikerDetails').innerHTML   = changeBattingTableData(striker,'*','bat');
  //  table.appendChild(tr);
//    console.log(tr);
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
        addPlayer.createInputField();

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
    div5.innerHTML = '';
   // if(div5.hasChildNodes()==false) {
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
            alert('retire...');
            striker.batting.retire = true;
            utils.setItem('gameId', gameObject);
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

function checkOver(){
        scoreTR1.innerHTML='';
    let td = document.createElement('td');
    td.id = 'thisOver';
    td.rowSpan = 2;
    td.innerText = "This over:  ";
    scoreTR1.appendChild(td);
        scoreTR2.innerHTML='';
        // count=0;
        // alert("one over is done");
        // console.log("c"+count);
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

            //count++;

           // console.log("c......"+count);
            let td1 = document.createElement('td'),td2 = document.createElement('td') ,span = document.createElement('span'),span2 = document.createElement('span');
        td1.id = 'scoreButton';
        td2.id = 'scoreButton';
            span.id = 'ball'+value;
            span2.id = 'type'
let label = document.createElement('label');
label.id = 'scoreTag';

            if(byes==true || lB == true || wide ==true){
                span.innerText = '0';

                td1.appendChild(span);
                scoreTR1.appendChild(td1);
               // battingTeam.addPartnershipScore(value);
                battingTeam.partnershipScore = object.addPartnershipScore(battingTeam.partnershipScore,value);
                if(byes==true){
                    label.htmlFor = 'ball'+value;
                    label.innerText = value+'BYE';
                  //  span2.innerText = value+'BYE';
                    //battingTeam.extras.addByes(value);
                    battingTeam.extras.byes = object.addByes(battingTeam.extras.byes,value);
                   // td2.appendChild(span2)
                    td2.appendChild(label)
                    scoreTR2.appendChild(td2);
                    byes=false;
                    let ball = new object.ballDetail(0,value+'BYE');
                    bowler.bowling.ballDetails.push(ball);
                }
                if(lB==true){
                    label.htmlFor = 'ball'+value;
                    label.innerText = value+'LB';
                 //   span2.innerText = value+'LB';
                   // battingTeam.extras.addLB(value);
                    battingTeam.extras.lByes = object.addLB(value,battingTeam.extras.lByes);
                    td2.appendChild(label);
                  //  td2.appendChild(span2)
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
                 //   span2.innerText = score+'WD';
                    // battingTeam.extras.addWB(score);
                    battingTeam.extras.wB = object.addWB(battingTeam.extras.wB,score);
                    // battingTeam.addPartnershipScore(1);
                  //  td2.appendChild(span2)
                    td2.appendChild(label)
                    scoreTR2.appendChild(td2);
                    let ball = new object.ballDetail(0,score+'WD');
                    bowler.bowling.ballDetails.push(ball);

                }

            }
            else{
                console.log(value);
                //let ballNo = bowler.bowling.ballDetails.length-1;
                span.innerText = value;
                td1.appendChild(span);
                scoreTR1.appendChild(td1);
                if(NB==true){
                    let score = value+1;
                    // battingTeam.extras.addNB(1);
                    battingTeam.extras.noBall = object.addNB(battingTeam.extras.noBall,1);
                    //   battingTeam.addPartnershipScore(1);
                    label.htmlFor = 'ball'+value;
                    label.innerText = 'NB';
                    //span2.innerText = 'NB';
                    td2.appendChild(label)
                    scoreTR2.appendChild(td2);
                    let ball = new object.ballDetail(value,'NB');
                    bowler.bowling.ballDetails.push(ball);
                }else{
                    label.htmlFor = 'ball'+value;
                    label.innerText = '';
                   // span2.innerText ='';
                    td2.appendChild(label)
                    scoreTR2.appendChild(td2);
                    let ball = new object.ballDetail(value,'');
                    bowler.bowling.ballDetails.push(ball);
                }

                // striker.batting.getRuns(value);
                striker.batting.run = object.getRuns(striker.batting.run,value);
                bowler.bowling.run = object.getRuns(bowler.bowling.run,value);

                // bowler.bowling.getRuns(value);
            }



            if( wide!=true){
                striker.batting.ballNo++;
                if(NB!=true){
                    bowler.bowling.ballNo++;
                    bowler.bowling.er = object.eR(bowler.bowling.er,bowler.bowling.ballNo,bowler.bowling.run);
                    count++;
                }

            }
            // striker.batting.sR();
            striker.batting.sr = object.sR(striker.batting.ballNo,striker.batting.sr,striker.batting.run);
            console.log(striker.batting.sr);
            bowler.bowling.overs = object.getOver(bowler.bowling.ballNo,bowler.bowling.overs);
            // bowler.bowling.getOver();
            battingTeam.totalOver = object.getTotalOver(bowlingTeam.players,battingTeam.totalOver);
            //battingTeam.getTotalOver();
            document.getElementById('over').innerText =battingTeam.totalOver;
            //battingTeam.getTotalScore();
       // console.log('previous Total Score: '+ battingTeam.totalScore);
            battingTeam.totalScore = object.getTotalScore(battingTeam.players,battingTeam.partnershipScore);
        //console.log('after Total Score: '+ battingTeam.totalScore);
            document.getElementById('runScore').innerText = battingTeam.totalScore;
        if (value % 2 != 0) {
            swapPlayer('odd');
            console.log("Swapped");
        }
          //  console.log("player's SR: "+striker.batting.sR());
            if(value ==4 && byes!=true && lB != true &&wide !=true){
                striker.batting.fours++;
            }
            if(value==6&& byes!=true && lB != true &&wide !=true){
                striker.batting.sixs++;
            }
            table.innerHTML = '';
            createBattingPLayerTable();
            createBowlerTable();
            if(bowler.bowling.ballNo==6){
                setTimeout(checkOver,2000);
            }
             console.log('after clicking run button:....'+gameObject);
             console.log(value);
            wide = false;
            NB=false;
        utils.setItem('gameId',gameObject);
        }
    return input;
}

function createFifthRow(){
    div6.innerHTML = '';
   // if(div6.hasChildNodes()==false) {
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
            div = document.createElement('div');
        // div2= document.createElement('div');
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
                // div2.style.display = 'none';
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
        div6.appendChild(div2);
 //   }
}
function menuButtonOnClick(){
    let game = utils.getItem('gameId');
    let newMatch = document.getElementById('newMatch');
    newMatch.onclick = function (){

    }
    let teamButton = document.getElementById('teams');
    teamButton.onclick = function (){
        //  console.log('teams....');
        // let game = utils.getItem('gameId');
        getTeam.teamName(game);
    }
    let historyButton = document.getElementById('history');
    historyButton.onclick = function (){
        history(game);
    }



}
//
// function createObject(){
//
//     //match = runningMatch;
//
//
// }

export function createBody(matchIndex){
    battingTeam = '';
    bowlingTeam = '';
    striker = '';
    nonStriker = '';
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
//    gameObject = game;
    console.log("create body function called....")
    setInnings();
   // body.innerHTML = '';
    addLink();
    div0.id = 'menuItem';
 //   div1.id = "center";
    div2.id = "firstRow";
    div3.id = "secondRow";
    div4.id = "thirdRow";
    div5.id = "fourthRow";
    div6.id = "fifthRow";
   // setMenuItems();
    createTitle();
    createFirstRow();
    createSecondRow();
    createThirdRow();
    createFourthRow();
    createFifthRow();
    div1.appendChild(div0);
    div1.appendChild(headingDiv);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    div1.appendChild(div6);
 //   body.appendChild(div1);
  //  menuButtonOnClick();
    return div1;
}
