import {addModal} from "./Extras.js";
import * as utils from './LocalStorageUtils.js';
let body = document.getElementsByTagName('body')[0],
    div = document.createElement('div'),changedName,games=utils.getItem('gameId'),
    removeItem;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    //head.innerHTML = '';
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/teamList.css";
    head.appendChild(link);
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
function editTeamName(name){
   // div=addModal();
    let teamName = prompt("Update Team",name);
    // if(teamName!=null){
    //     name = teamName;
    // }
    // let h3 = document.createElement('h3'),
    // input = document.createElement('input');
    // h3.innerText = 'Update Team';

    return teamName;

}


function createDiv(team){
    let div = document.createElement('div'),
    table = document.createElement('table'),
    tr1 = document.createElement('tr'),
    tr2= document.createElement('tr'),
    td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
    img = document.createElement('img'),
        img2 = document.createElement('img');
    //<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    img.id = 'editIcon';
    img.onclick=()=>{
        changedName = editTeamName(name);
        for(let i=0;i<team.matchNo.length;i++){
            if(team.tName ==  games.matches[team.matchNo[i]].innings[0].battingTeam.teamName){
                games.matches[team.matchNo[i]].innings[0].battingTeam.teamName = changedName;
                games.matches[team.matchNo[i]].innings[1].bowlingTeam.teamName = changedName;
            }
            else{
                games.matches[team.matchNo[i]].innings[0].bowlingTeam.teamName = changedName;
                games.matches[team.matchNo[i]].innings[1].battingTeam.teamName = changedName;
            }
        }
        utils.setItem('gameId',games);
        td2.innerText = changedName;
    }
    img.src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png';
    img.alt = 'edit icon';
    img2.id = 'removeIcon';
    img2.src='https://cdn.onlinewebfonts.com/svg/img_304350.png';
    img2.alt = 'remove icon';
    img2.onclick=()=>{
        let confirmation =removeTeam();
        if(confirmation==true){
            for(let i=0;i<team.matchNo.length;i++){
                if(team.tName ==  games.matches[team.matchNo[i]].innings[0].battingTeam.teamName){
                    games.matches[team.matchNo[i]].innings[0].battingTeam.teamName = 'Unknown';
                    games.matches[team.matchNo[i]].innings[1].bowlingTeam.teamName = 'Unknown';
                    for(let j=0;j<games.matches[team.matchNo[i]].innings[0].battingTeam.players.length;j++){
                        games.matches[team.matchNo[i]].innings[0].battingTeam.players[j].playerName = 'Unknown';
                    }
                    for(let j=0;j<games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length;j++){
                        games.matches[team.matchNo[i]].innings[1].bowlingTeam.players[j].playerName = 'Unknown';
                    }


                }
                else{
                    games.matches[team.matchNo[i]].innings[0].bowlingTeam.teamName = 'Unknown';
                    games.matches[team.matchNo[i]].innings[1].battingTeam.teamName = 'Unknown';
                    for(let j=0;j<games.matches[team.matchNo[i]].innings[1].battingTeam.players.length;j++){
                        games.matches[team.matchNo[i]].innings[1].battingTeam.players[j].playerName = 'Unknown';
                    }
                    for(let j=0;j<games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length;j++){
                        games.matches[team.matchNo[i]].innings[0].bowlingTeam.players[j].playerName = 'Unknown';
                    }
                }
            }
            utils.setItem('gameId',games);
            removeItem=true;
            teamName();
        }
    }
    div.id = 'teamDiv'
    td1.id = 'teamName';
    td1.rowSpan = 2;

    td1.innerText = team.tName.charAt(0).toUpperCase();
    td1.style.backgroundColor = getRandomColor();
    td2.colSpan = 3;
    td2.innerText = team.tName;
    td6.id = 'editTeamName';
    td6.rowSpan = 2;
    td6.appendChild(img);
    td7.rowSpan = 2;
    td7.id = 'remove';
    td7.appendChild(img2);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td6);
    tr1.appendChild(td7);
    td3.id = 'totalMatch';
    td3.innerText="Matches: "+team.matchCount;
    td4.id = 'totalWon';
    let winCount = 0;
    for (let i=0;i<team.matchNo.length;i++){
        console.log(team.matchNo[i]);

        if(games.matches[team.matchNo[i]].winnerTeamName==team.tName){
            winCount++;
        }
    }
    td4.innerText = "Won:  " + winCount;
    td5.id = 'totalLost';
    let lostCount = 0;
    for (let i=0;i<team.matchNo.length;i++){
        if(games.matches[team.matchNo[i]].losserTeamName==team.tName){
            lostCount++;
        }
    }
    td5.innerText ='Lost:  '+lostCount;

    tr2.appendChild(td3);
    tr2.appendChild(td4);
    tr2.appendChild(td5);

    table.appendChild(tr1);
    table.appendChild(tr2);
    div.appendChild(table);
    return div;
}

function teamInfo(){
    this.matchNo  = [];
    this.tName = '';
    this.matchCount = 0;
}
export function teamName(game){
    div.innerHTML = '';
    console.log("taken game:...."+ game);

    if(game == null){
        games = utils.getItem('gameId');
    }
    else{
        games = game;
    }
    addLink();
    let match = [],teamsName = [],teamInfos = [];
console.log(games.matches.length,match.length);
    for(let i=0;i<games.matches.length;i++){
       // if(games.matches[i].innings[0].battingTeam!=''){
            match[i] = games.matches[i].innings[0];
          console.log('TeamsName: '+i+'   '+match[i].battingTeam);
       // }
    }
console.log(match.length);
    for(let i=0;i<match.length;i++){
        if(match[i].battingTeam.teamName=='Unknown'){
            let team1 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].bowlingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount ++;
            teamInfos.push(team1);
        }
        if(match[i].bowlingTeam.teamName=='Unknown'){
            let team1 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].battingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount ++;
            teamInfos.push(team1);
        }
        if(match[i].battingTeam.teamName!='Unknown'&match[i].bowlingTeam.teamName!='Unknown'){
            let team1 = new teamInfo(),
                team2 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].battingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount ++;
            teamInfos.push(team1);
            team2.matchNo.push(i);
            team2.tName = match[i].bowlingTeam.teamName;
            team2.matchCount ++;
            console.log(team2.tName);
            teamInfos.push(team2);
        }
    }
    for(let i=0;i<teamInfos.length;i++){
        console.log(teamInfos[i]);
    }

    for(let i=0;i<teamInfos.length;i++){
        console.log(teamInfos.length);
        console.log(teamInfos[i].tName);
        for(let j=0;j<teamInfos.length;j++){
            console.log(teamInfos.length,j,i);
            console.log(teamInfos[j].tName);
            if(i==j){
                continue;
            }
            if(teamInfos.length ==i){
                break;
            }
            if(teamInfos[i].tName == teamInfos[j].tName){
                console.log('match Found '+teamInfos[j].tName);
                console.log(teamInfos[i].matchCount);
                teamInfos[i].matchCount++;
                console.log(teamInfos[i].matchCount);
                teamInfos[i].matchNo.push(teamInfos[j].matchNo);
                teamInfos.splice(j,1);
                console.log(teamInfos);
                j=0;
            }
        }
    }
    for(let i=0;i<teamInfos.length;i++){
        console.log(teamInfos[i].tName,teamInfos[i].matchNo,teamInfos[i].matchCount);
        div.appendChild(createDiv(teamInfos[i]));
    }


    return div;
}