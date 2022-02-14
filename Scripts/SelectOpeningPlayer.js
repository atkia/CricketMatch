import * as object from "./PlayerData.js";
import * as utils from './LocalStorageUtils.js';
import {getItem} from "./LocalStorageUtils.js";

let headingTitle = "Select Opening Players",
    titleOfInputFields = ["Striker","Non Striker","Bowler"],
    body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    form = document.createElement('form'),
    hostTeamName,visitorTeamName;

export let  matchIndex,inningIndex;
    //hostTeam,visitorTeam;
let game,match;
function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/OpeningPlayerName.css";
    head.appendChild(link);
}

function inputField(id,name){
    let input = document.createElement('input');
    input.id = id;
    input.name = name;
    return input;
}

function createTitle(){
    let span = document.createElement('span'),
        img = document.createElement('img'),
        i = document.createElement('i');
    i.className="fas fa-arrow-left";
    span.innerText = headingTitle;
    img.src = 'https://pixabay.com/static/uploads/photo/2012/04/15/21/34/arrow-35386_960_720.png';
    img.id = 'backArrow';
    span.id = "heading"
    div2.id = "title";
    div2.appendChild(img);
    div2.appendChild(span);
}

function createInputFields(){
    for(let heading of titleOfInputFields){
        let h2 = document.createElement('h2');
        h2.id = 'selectPLayerHeading'
        h2.innerText = heading;
        let input = document.createElement('input');
        input = inputField("f1",heading);
        input.type = "text";
        input.placeholder = "Player Name";
        form.appendChild(h2);
        form.appendChild(input);
    }
}

function createSubmitButton(){
    let input = document.createElement('input');

    input.type="button";
    input.value="Start match";
    input.className="centerSubmit";
    input.id='startMatch';
    div3.appendChild(input);
}
export function createObjects(){
    hostTeamName = localStorage.getItem('Host Name');
    visitorTeamName = localStorage.getItem('Visitor Name');
    let player1Name = localStorage.getItem('Striker'),
        player2Name = localStorage.getItem('Non Striker')
        ,player3Name = localStorage.getItem('Bowler'),
        over = localStorage.getItem('over'),
        inning1,inning2;
    let player1 = new object.player(player1Name,'batting'),
        player2 = new object.player(player2Name,'batting'),
        player3 = new object.player(player3Name,'bowling'),
        hostTeam = new object.team(hostTeamName),
    visitorTeam = new object.team(visitorTeamName);
    inning1 = new object.Inning();
    inning2 = new object.Inning();
    match = new object.match();
    let currentDate = new Date(),
    month = currentDate.getMonth()+1;
    match.date = currentDate.getDate()+"/" + month+ "/" + currentDate.getFullYear() ;
    match.time =  currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
   // match.addMatchNo();
    console.log("match time and date:..."+match.date+"...."+match.time);
    console.log('This match will be of '+over);
    console.log(hostTeam.teamName);
    console.log(visitorTeam);
    game = utils.getItem('gameId');
    match.matchOvers = over+'.0';
    let tossWonBy = localStorage.getItem('tossWonBy');
    let optedTo = localStorage.getItem('optTo');

    if(tossWonBy == 'HostTeam') {
        match.tossWonBy = hostTeamName;
        if(optedTo === 'Bat'){
            match.optedTo = 'bat';
            inning1.battingTeam = hostTeam;
            inning2.bowlingTeam = hostTeam;
            console.log(hostTeam.teamName);
            inning1.bowlingTeam = visitorTeam;
            inning2.battingTeam = visitorTeam;
        }
        else {
            match.optedTo = 'bowl';
            inning1.battingTeam = visitorTeam;
            inning2.bowlingTeam = visitorTeam;
            inning1.bowlingTeam = hostTeam;
            inning2.battingTeam = hostTeam;
        }
    }
    else{
        match.tossWonBy = visitorTeamName;
        if(optedTo=='Bat'){
            match.optedTo = 'bat';
            inning1.battingTeam = visitorTeam;
            inning2.bowlingTeam = visitorTeam;
            console.log(hostTeam.teamName);
            inning1.bowlingTeam = hostTeam;
            inning2.battingTeam = hostTeam;
        }
        else {
            match.optedTo = 'bowl';
            inning1.battingTeam = hostTeam;
            inning2.bowlingTeam = hostTeam;
            inning1.bowlingTeam = visitorTeam;
            inning2.battingTeam = visitorTeam;

        }
    }
    let previousMatchIndex = 0;
    if(game.matches.length!=0){
        console.log('game match:...',game.matches.length);
        let index = game.matches.length-1;
        previousMatchIndex = game.matches[index].matchIndex;
        console.log('previousMatchIndex',previousMatchIndex);
        match.matchIndex = match.matchIndex+previousMatchIndex+1;
        matchIndex = match.matchIndex;
    }
    else{
        match.matchIndex = match.matchIndex+1;
        matchIndex= match.matchIndex;
        console.log("match index increased: "+matchIndex);
    }
    match.inningIndex++;
    inningIndex = match.inningIndex;
    match.innings.push(inning1);
    match.innings.push(inning2);
    game.matches.push(match);
    utils.setItem('gameId',game);
}

export function createDivs(){
    div1.innerHTML = '';
    div2.innerHTML = '';
    div3.innerHTML = '';
    form.innerHTML = '';
 //   body.innerHTML = '';
    console.log("createdDivs");
 //   div1.className = "center";
    addLink();
    form.id = "player_form";
    createTitle();
    createInputFields();
    div1.appendChild(div2);
    div1.appendChild(div3);
    div3.appendChild(form);
    createSubmitButton();
//    body.appendChild(div1);
    return div1;
}




