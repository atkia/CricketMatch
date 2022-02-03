import * as object from "./PlayerData.js";
import * as utils from './LocalStorageUtils.js';

let headingTitle = "Select Opening Players",
    titleOfInputFields = ["Striker","Non Striker","Bowler"],
    body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    form = document.createElement('form'),
    hostTeamName,visitorTeamName;

export let  game,match,index;
    //hostTeam,visitorTeam;

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
    let h2 = document.createElement('h2');
    h2.innerText = headingTitle;
    h2.id = "heading"
    div2.id = "title";
    div2.appendChild(h2);
}

function createInputFields(){
    for(let heading of titleOfInputFields){
        let h2 = document.createElement('h2');
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
    input.id='Submit';
    div3.appendChild(input);
}
export function createObjects(){

    hostTeamName = localStorage.getItem('Host Name');
    visitorTeamName = localStorage.getItem('Visitor Name');
    let player1Name = localStorage.getItem('Striker'),
        player2Name = localStorage.getItem('Non Striker')
        ,player3Name = localStorage.getItem('Bowler'),
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
    game = utils.getItem('gameId');

    let tossWonBy = localStorage.getItem('tossWonBy');
    let optedTo = localStorage.getItem('optTo');

    if(tossWonBy == 'HostTeam') {
        match.tossWonBy = hostTeamName;
        if(optedTo === 'Bat'){
            match.optedTo = 'bat';
           // hostTeam.type = 'batting';
            inning1.battingTeam = hostTeam;
            inning2.bowlingTeam = hostTeam;
          //  inning2.hostTeam.type = 'bowling';
          //  visitorTeam.type = 'bowling';
            inning1.bowlingTeam = visitorTeam;
            inning2.battingTeam = visitorTeam;
         //   inning2.visitorTeam.type = 'batting'
            hostTeam.players.push(player1);
            hostTeam.players.push(player2);
            visitorTeam.players.push(player3)
        }
        else {
            match.optedTo = 'bowl';
        //    hostTeam.type = 'bowling';
            inning1.battingTeam = visitorTeam;
            inning2.bowlingTeam = visitorTeam;
            inning1.bowlingTeam = hostTeam;
            inning2.battingTeam = hostTeam;
          //  inning2.hostTeam.type = 'batting';
          //  visitorTeam.type = 'batting';
         //   inning2.visitorTeam.type = 'bowling';
            visitorTeam.players.push(player1);
            visitorTeam.players.push(player2);
            hostTeam.players.push(player3)
        }
    }
    else{
        match.tossWonBy = visitorTeamName;
        if(optedTo=='Bat'){
            match.optedTo='bat';
        }
        else {
            match.optedTo = 'bowl';
        }
    }
    // else {
    //     if(optedTo === 'Bat'){
    //         visitorTeam.type = 'batting';
    //
    //         inning1.battingTeam = visitorTeam;
    //         inning2.bowlingTeam = visitorTeam;
    //         inning1.bowlingTeam = hostTeam;
    //         inning2.battingTeam = hostTeam;
    //
    //      //   inning2.visitorTeam.type = 'bowling';
    //         hostTeam.type = 'bowling';
    //      //   inning2.hostTeam.type = 'batting'
    //         visitorTeam.players.push(player1);
    //         visitorTeam.players.push(player2);
    //         hostTeam.players.push(player3);
    //     }
    //     else {
    //         visitorTeam.type = 'bowling';
    //     //    inning2.visitorTeam.type = 'batting';
    //         hostTeam.type = 'batting';
    //     //    inning2.hostTeam.type = 'bowling'
    //         hostTeam.players.push(player1);
    //         hostTeam.players.push(player2);
    //         visitorTeam.players.push(player3)
    //     }
    //
    // }
   // match.hostTeam = hostTeam;
   // match.visitorTeam = visitorTeam;
   // console.log("hostTeam:  "+ match.hostTeam);
  //  console.log("visitor Team:   "+match.visitorTeam);

   // inning1.hostTeam = hostTeam;
   //  inning1.visitorTeam = visitorTeam;
   //  // match.innings1 = inning1;
   //  inning2.hostTeam = changeType(hostTeam);
   //  inning2.visitorTeam = changeType(visitorTeam);
    index = match.index;
    match.innings.push(inning1);
    match.innings.push(inning2);
   // match.innings.push(hostTeam);
    console.log(match.innings);
    game.matches.push(match);
    utils.setItem(game.id,game);
}

export function createDivs(){
    body.innerHTML = '';
    console.log("createdDivs");
    div1.className = "center";
    addLink();
    form.id = "player_form";
    createTitle();
    createInputFields();
    div1.appendChild(div2);
    div1.appendChild(div3);
    div3.appendChild(form);
    createSubmitButton();
    body.appendChild(div1);
    return body;
}




