import {addModal} from "./Extras.js";
import * as object from "./PlayerData.js";
import * as utils from './LocalStorageUtils.js';
import {createPlayerDetailsDiv} from "./PlayerDetails.js";
import {NotPlayedTeam, NotPlayedTeamList, player} from "./PlayerData.js";
let body = document.getElementsByTagName('body')[0],
    div = document.createElement('div'),changedName,games=utils.getItem('gameId'),
    removeItem,notPlayedTeam;
function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = "./Stylesheets/teamList.css";
    head.appendChild(link);
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
function removePlayer(){
    let text = "Are you sure you want to delete this Player? All the matches played by this player will not be deleted."
    if(confirm(text)==true){
      return true;
    }

}
function removeTeam(){
    let text = "Are you sure you want to delete this team? All the associated matches and players stats of this team will not be deleted."
    if(confirm(text)==true){
        return true;
    }

}
function editTeamName(name){
    let teamName = prompt("Update Team",name);
    return teamName;
}

function createPlayerDiv(team,player){
    let div1 = document.createElement('div'),
        ul = document.createElement('ul'),
        li1 = document.createElement('li'),
        li2 = document.createElement('li'),
        li3 = document.createElement('li'),
        li4 = document.createElement('li'),
        li5 = document.createElement('li'),
        img = document.createElement('img'),
        button = document.createElement('button'),
        i = document.createElement('i'),
        img1 = document.createElement('img'),
        img2 = document.createElement('img'),
        img3 = document.createElement('img');
    ul.id = 'playerDetails';
    li1.id = 'personIconLi';
    li3.id = 'editIconLi';
    li4.id = 'editIconLi';
    li5.id = 'editIconLi';
    li2.innerText = player.playerName;
    li2.id = 'playerName';
    img3.id = 'scroll';
    img3.src = 'https://www.shareicon.net/data/256x256/2016/04/03/743930_button_512x512.png';
    // img1.id = 'personIcon';
    button.id = 'personIconBtn';
    i.className="fas fa-user";
    // img1.src = 'https://www.pngkit.com/png/full/14-141902_person-icon-png.png';
    i.onclick = ()=>{
        console.log(team.tName,player.playerName);
        document.getElementById('center').appendChild(createPlayerDetailsDiv(team.tName,player));
        document.getElementById('playerListDiv').style.display = 'none';
        document.getElementById('teamTitle').style.display = 'none';
    }
    button.appendChild(i);
    img.id = 'editIcon';
    img.onclick=()=>{
        changedName = editTeamName(name);
        for (let i=0;i<team.matchNo.length;i++){
            console.log(team.tName);
            console.log(team.matchNo[i]);
            console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.teamName);
            console.log(games.matches[0].innings[1].battingTeam.teamName);
            if(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length!==0){
                let playerNo  = games.matches[team.matchNo[i]].innings[0].battingTeam.players.length;
                let tempTeam = games.matches[team.matchNo[i]].innings[0].battingTeam;
                console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                for(let i=0;i<playerNo;i++){
                    if(tempTeam.players[i].playerName ==player.playerName){
                        console.log(changedName);
                        tempTeam.players[i].playerName = changedName;
                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length!=0){
                let playerNo  = games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length;
                let tempTeam = games.matches[team.matchNo[i]].innings[0].bowlingTeam;
                console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                for(let i=0;i<playerNo;i++){
                    if(tempTeam.players[i].playerName ==player.playerName){
                        console.log(changedName);
                        tempTeam.players[i].playerName = changedName;
                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length!=0){
                let playerNo  = games.matches[team.matchNo[i]].innings[1].battingTeam.players.length;
                let tempTeam = games.matches[team.matchNo[i]].innings[1].battingTeam;
                console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                for(let i=0;i<playerNo;i++){
                    if(tempTeam.players[i].playerName ==player.playerName){
                        console.log(changedName);
                        tempTeam.players[i].playerName = changedName;
                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length!=0){
                let playerNo  = games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length;
                let tempTeam = games.matches[team.matchNo[i]].innings[1].bowlingTeam;
                console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                for(let i=0;i<playerNo;i++){
                    if(tempTeam.players[i].playerName ==player.playerName){
                        console.log(changedName);
                        tempTeam.players[i].playerName = changedName;
                    }
                }
            }
        }
        utils.setItem('gameId',games);
        li2.innerText = changedName;
    }
    img.src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png';
    img.alt = 'edit icon';
    img2.id = 'removeIcon';
    img2.src='https://cdn.onlinewebfonts.com/svg/img_304350.png';
    img2.alt = 'remove icon';
    img2.onclick=()=>{
        let confirmation =removePlayer();
        if(confirmation==true){
            for (let i=0;i<team.matchNo.length;i++){
                if(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length!==0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[0].battingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[0].battingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        if(tempTeam.players[i].playerName ==player.playerName){
                            console.log(changedName);
                            tempTeam.players[i].playerName = 'Unknown';
                        }
                    }
                }
                if(games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[0].bowlingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        if(tempTeam.players[i].playerName ==player.playerName){
                            console.log(changedName);
                            tempTeam.players[i].playerName = 'Unknown';
                        }
                    }
                }
                if(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[1].battingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[1].battingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        if(tempTeam.players[i].playerName ==player.playerName){
                            console.log(changedName);
                            tempTeam.players[i].playerName = 'Unknown';
                        }
                    }
                }
                if(games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[1].bowlingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        if(tempTeam.players[i].playerName ==player.playerName){
                            console.log(changedName);
                            tempTeam.players[i].playerName = 'Unknown';
                        }
                    }
                }
            }
            utils.setItem('gameId',games);
            document.getElementById('playerListDiv').remove();
            document.getElementById('center').appendChild(createPlayerList(team));
        }
    }
    li1.appendChild(button);
    li3.appendChild(img);
    li4.appendChild(img2);
    li5.appendChild(img3);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    div1.appendChild(ul);
    return div1;
}

function createPlayerDivList(team,players){
    let div = document.createElement('div');
    div.id = 'playerListDiv';
    for(let i=0;i<players.length;i++){
       div.appendChild( createPlayerDiv(team,players[i]));
    }
    return div;
}

function createPlayerList(team,type){
    console.log('create player list function called')
    let playersOfTeam = [];
    if(type =='played'){
        for (let i=0;i<team.matchNo.length;i++){
            if(games.matches[team.matchNo[i]].innings[0].battingTeam.teamName===team.tName){
                if(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length!==0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[0].battingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[0].battingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        console.log(tempTeam.players[i]);
                        if(tempTeam.players[i].playerName!='Unknown'){
                            playersOfTeam.push(tempTeam.players[i]);
                        }

                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[0].bowlingTeam.teamName==team.tName){
                if(games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[0].bowlingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[0].bowlingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[0].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        console.log(tempTeam.players[i].playerName);
                        if(tempTeam.players[i].playerName!='Unknown'){
                            playersOfTeam.push(tempTeam.players[i]);
                        }
                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[1].battingTeam.teamName==team.tName){
                if(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[1].battingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[1].battingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        console.log(tempTeam.players[i].playerName);
                        if(tempTeam.players[i].playerName!='Unknown'){
                            playersOfTeam.push(tempTeam.players[i]);
                        }
                    }
                }
            }
            if(games.matches[team.matchNo[i]].innings[1].bowlingTeam.teamName==team.tName){
                if(games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length!=0){
                    let playerNo  = games.matches[team.matchNo[i]].innings[1].bowlingTeam.players.length;
                    let tempTeam = games.matches[team.matchNo[i]].innings[1].bowlingTeam;
                    console.log(games.matches[team.matchNo[i]].innings[1].battingTeam.players.length);
                    for(let i=0;i<playerNo;i++){
                        console.log(tempTeam.players[i].playerName);
                        if(tempTeam.players[i].playerName!='Unknown'){
                            playersOfTeam.push(tempTeam.players[i]);
                        }
                    }
                }
            }
        }
    }
    else{
        console.log(notPlayedTeam.notPlayedTeams[0].players.length);

        for(let i=0;i<notPlayedTeam.notPlayedTeams.length;i++){
            if(notPlayedTeam.notPlayedTeams[i].teamName == team.teamName){
                for(let j=0;j<notPlayedTeam.notPlayedTeams[i].players.length;j++){
                    let player = notPlayedTeam.notPlayedTeams[i].players[j];
                    playersOfTeam.push(player);
                }

            }
        }
    }

    for(let i=0;i<playersOfTeam.length;i++){
        console.log(playersOfTeam[i]);
    }
    let div = createPlayerDivList(team,playersOfTeam);
    return div;
}

function createTitleDiv(team,type){
    let div = document.createElement('div'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        i = document.createElement('i');
    div.id = 'teamTitle';
    i.className = "fas fa-arrow-left";
    i.id = 'backArrow';
    span.id= 'teamNameWhite';
    if(type == 'played'){
        span.innerText = team.tName;
    }
    else{
        span.innerText = team.teamName;
    }
    div.appendChild(i);
    div.appendChild(span);
return div;
}
function playerAddDiv(){
    let div = document.createElement('div'),
        div1 = document.createElement('div'),
        i = document.createElement('i'),
        span = document.createElement('span'),
        span1 = document.createElement('span'),
        input = document.createElement('input');
    i.id = 'cancel';
    i.className="fas fa-times";
    span.id = 'addPlayerSpan';
    span.innerText = 'Add Player';
    span1.id = 'ok';
    span1.innerText = 'save';
    div1.id = 'addPlayerHeadingDiv';
    input.id = "playerAddingInput";
    input.type = 'text';
    input.name = 'newPlayerName';
    input.placeholder='Enter Player Name';
    div1.appendChild(i);
    div1.appendChild(span);
    div1.appendChild(span1);
    div.appendChild(div1);
    div.appendChild(input);
    div.id = 'playerAddDiv'
    return div;
}
function playerAddBtnOnclick(team,type,button){
    let div22 = playerAddDiv();
    let newPlayerName;
    document.getElementById('personAdd').style.display = 'none';
    document.getElementById('teamTitle').style.display = 'none';
    document.getElementById('playerListDiv').style.display = 'none';
    document.getElementById('center').appendChild(div22);
    document.getElementById('cancel').onclick = () => {
        div22.remove();
        document.getElementById('teamTitle').style.display = 'block';
        document.getElementById('personAdd').style.display = 'block';
    }
    document.getElementById('ok').onclick = () => {
        document.getElementById('personAdd').remove();

        document.getElementById('teamTitle').style.display = 'block';
        document.getElementById('playerListDiv').style.display = 'block';
        let input = document.getElementById('playerAddingInput');
        newPlayerName = input.value;
        localStorage.setItem(input.name, newPlayerName);
        div22.remove();
        if(type =='notPlayed'){
            let player = new object.player(newPlayerName);
            for (let i = 0; i < notPlayedTeam.notPlayedTeams.length; i++) {
                if (notPlayedTeam.notPlayedTeams[i].teamName == team.teamName) {
                    notPlayedTeam.notPlayedTeams[i].players.push(player);
                }

            }
            utils.setItem('notPlayed', notPlayedTeam);
        }
        // else{
        //     for (let i=0;i<team.matchNo.length;i++) {
        //         if (games.matches[team.matchNo[i]].innings[0].battingTeam.players.length !== 0) {
        //
        //         }
        //     }
        // }
        document.getElementById('playerListDiv').remove();
        document.getElementById('center').appendChild(createPlayerList(team, type));
        document.getElementById('center').appendChild(button);
        document.getElementById('personAdd').style.display = 'block';
    }
}
function teamNameClicked(team,type) {
    console.log('teamNam clicked...');
    let button = document.createElement('button'),
        i = document.createElement('i');
    button.id = 'personAdd';
    i.className = "fas fa-user-plus";
    i.style.color = 'white';
    button.appendChild(i);


    document.getElementById('teamListDiv').style.display = 'none';
    document.getElementById('fixedTitleDiv').style.display = 'none';
    document.getElementById('menuItems').style.display = 'none';
    document.getElementById('center').appendChild(createTitleDiv(team, type));

    if (type == 'notPlayed') {
        if (team.players.length == 0) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.innerText = "You don't have any players added in the team yet.Please add players";
            div.appendChild(p);
            div.id = "playerListDiv";
            document.getElementById('center').appendChild(div);

        }
        button.onclick = () => {
            playerAddBtnOnclick(team,type,button);
            // let div22 = playerAddDiv();
            // let newPlayerName;
            // document.getElementById('personAdd').style.display = 'none';
            // document.getElementById('teamTitle').style.display = 'none';
            // document.getElementById('playerListDiv').style.display = 'none';
            // document.getElementById('center').appendChild(div22);
            // document.getElementById('cancel').onclick = () => {
            //     div22.remove();
            //     document.getElementById('teamTitle').style.display = 'block';
            //     document.getElementById('personAdd').style.display = 'block';
            // }
            // document.getElementById('ok').onclick = () => {
            //     document.getElementById('personAdd').remove();
            //
            //     document.getElementById('teamTitle').style.display = 'block';
            //     document.getElementById('playerListDiv').style.display = 'block';
            //     let input = document.getElementById('playerAddingInput');
            //     newPlayerName = input.value;
            //     localStorage.setItem(input.name, newPlayerName);
            //     div22.remove();
            //     let player = new object.player(newPlayerName);
            //     for (let i = 0; i < notPlayedTeam.notPlayedTeams.length; i++) {
            //         if (notPlayedTeam.notPlayedTeams[i].teamName == team.teamName) {
            //             notPlayedTeam.notPlayedTeams[i].players.push(player);
            //         }
            //
            //     }
            //     utils.setItem('notPlayed', notPlayedTeam);
            //     document.getElementById('playerListDiv').remove();
            //     document.getElementById('center').appendChild(createPlayerList(team, type));
            //     document.getElementById('center').appendChild(button);
            //     document.getElementById('personAdd').style.display = 'block';
            // }

        }

    }
         document.getElementById('center').appendChild(createPlayerList(team, type));
    document.getElementById('center').appendChild(button);
    if (document.getElementById('backArrow') != null) {
       document.getElementById('backArrow').onclick = () => {
                console.log('back arrow clicked')
                document.getElementById('teamListDiv').style.display = 'block';
                document.getElementById('fixedTitleDiv').style.display = 'block';
                document.getElementById('menuItems').style.display = 'block';
                document.getElementById('teamTitle').remove();
            document.getElementById('playerListDiv').remove();
            document.getElementById('personAdd').remove();
       }
    }
}
function createDiv(team,type){
    console.log(team,type)
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
    img.id = 'editIcon';
    img.src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png';
    img.alt = 'edit icon';
    img2.id = 'removeIcon';
    img2.src='https://cdn.onlinewebfonts.com/svg/img_304350.png';
    img2.alt = 'remove icon';
    div.id = 'teamDiv'
    td1.id = 'teamName';
    td1.rowSpan = 2;
    td1.style.backgroundColor = getRandomColor();
    td2.colSpan = 3;

    if(type == 'played'){
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
                // div.remove();
            }
        }
        td1.innerText = team.tName.charAt(0).toUpperCase();
        td1.onclick=()=>{
            teamNameClicked(team,'played');
        }
        td2.innerText = team.tName;
    }
    // img.onclick=()=>{
    //     changedName = editTeamName(name);
    //     for(let i=0;i<team.matchNo.length;i++){
    //         if(team.tName ==  games.matches[team.matchNo[i]].innings[0].battingTeam.teamName){
    //             games.matches[team.matchNo[i]].innings[0].battingTeam.teamName = changedName;
    //             games.matches[team.matchNo[i]].innings[1].bowlingTeam.teamName = changedName;
    //         }
    //         else{
    //             games.matches[team.matchNo[i]].innings[0].bowlingTeam.teamName = changedName;
    //             games.matches[team.matchNo[i]].innings[1].battingTeam.teamName = changedName;
    //         }
    //     }
    //     utils.setItem('gameId',games);
    //     td2.innerText = changedName;
    // }
    else{
        td1.innerText = team.teamName.charAt(0).toUpperCase();
        td1.onclick=()=>{
            teamNameClicked(team,'notPlayed');
        }
        td2.innerText = team.teamName;
    }
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
    td4.id = 'totalWon';
    td5.id = 'totalLost';
    if(type == 'played'){
        td3.innerText="Matches: "+team.matchCount;
        let winCount = 0;
        for (let i=0;i<team.matchNo.length;i++){
            console.log(team.matchNo[i]);

            if(games.matches[team.matchNo[i]].winnerTeamName==team.tName){
                winCount++;
            }
        }
        td4.innerText = "Won:  " + winCount;
        let lostCount = 0;
        for (let i=0;i<team.matchNo.length;i++){
            if(games.matches[team.matchNo[i]].losserTeamName==team.tName){
                lostCount++;
            }
        }
        td5.innerText ='Lost:  '+lostCount;
    }
    else {
        td3.innerText = "Matches: 0";
        td4.innerText = "Won:  0" ;
        td5.innerText ='Lost:  0';
    }

    tr2.appendChild(td3);
    tr2.appendChild(td4);
    tr2.appendChild(td5);

    table.appendChild(tr1);
    table.appendChild(tr2);
    div.appendChild(table);
    console.log(div);
    return div;
}

function teamInfo(){
    this.matchNo  = [];
    this.tName = '';
    this.matchCount = 0;
}
function teamAddDiv(){
    let div1 = document.createElement('div'),
        h1 = document.createElement('h1'),
        button1 = document.createElement('button'),
        button2 = document.createElement('button'),
        input = document.createElement('input');
    h1.innerText = 'Create Team';
    input.id = 'teamAddingInput'
    input.type = 'text';
    input.name = 'newTeamName';
    input.placeholder = 'Enter Team name';
    button1.id = 'cancel';
    button2.id = 'ok';
    button1.innerText = 'Cancel';
    button2.innerText = 'Ok';
    div1.appendChild(h1);
    div1.appendChild(input);
    div1.appendChild(button1);
    div1.appendChild(button2);
    return div1;
}
export function teamName(game) {
    div.innerHTML = '';
    console.log("taken game:...." + game);

    if (game == null) {
        games = utils.getItem('gameId');
    } else {
        games = game;
    }
    addLink();
    let match = [], teamsName = [], teamInfos = [];
    console.log(games.matches.length, match.length);
    for (let i = 0; i < games.matches.length; i++) {
        // if(games.matches[i].innings[0].battingTeam!=''){
        match[i] = games.matches[i].innings[0];
        console.log('TeamsName: ' + i + '   ' + match[i].battingTeam);
        // }
    }
    console.log(match.length);
    for (let i = 0; i < match.length; i++) {
        if (match[i].battingTeam.teamName == 'Unknown') {
            let team1 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].bowlingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount++;
            teamInfos.push(team1);
        }
        if (match[i].bowlingTeam.teamName == 'Unknown') {
            let team1 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].battingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount++;
            teamInfos.push(team1);
        }
        if (match[i].battingTeam.teamName != 'Unknown' & match[i].bowlingTeam.teamName != 'Unknown') {
            let team1 = new teamInfo(),
                team2 = new teamInfo();
            team1.matchNo.push(i);
            team1.tName = match[i].battingTeam.teamName;
            console.log(team1.tName);
            team1.matchCount++;
            teamInfos.push(team1);
            team2.matchNo.push(i);
            team2.tName = match[i].bowlingTeam.teamName;
            team2.matchCount++;
            console.log(team2.tName);
            teamInfos.push(team2);
        }
    }
    for (let i = 0; i < teamInfos.length; i++) {
        console.log(teamInfos.length);
        console.log(teamInfos[i].tName);
        for (let j = 0; j < teamInfos.length; j++) {
            console.log(teamInfos.length, j, i);
            console.log(teamInfos[j].tName);
            if (i == j) {
                continue;
            }
            if (teamInfos.length == i) {
                break;
            }
            if (teamInfos[i].tName == teamInfos[j].tName) {
                console.log('match Found ' + teamInfos[j].tName);
                console.log(teamInfos[i].matchCount);
                teamInfos[i].matchCount++;
                console.log(teamInfos[i].matchCount);
                teamInfos[i].matchNo.push(teamInfos[j].matchNo);
                teamInfos.splice(j, 1);
                console.log(teamInfos);
                j = 0;
            }
        }
    }
    if (utils.getItem('notPlayed')==null){
        notPlayedTeam = new object.NotPlayedTeamList();
        utils.setItem('notPlayed',notPlayedTeam);
    }
    else{
        notPlayedTeam = utils.getItem('notPlayed');
    }
    for (let i = 0; i < teamInfos.length; i++) {
        console.log(teamInfos[i].tName, teamInfos[i].matchNo, teamInfos[i].matchCount);
        div.appendChild(createDiv(teamInfos[i],'played'));
    }
    if(notPlayedTeam.notPlayedTeams.length!=0){
        for(let i=0;i<notPlayedTeam.notPlayedTeams.length;i++){
            div.appendChild(createDiv(notPlayedTeam.notPlayedTeams[i],'notPlayed'));
        }
    }
    let button = document.createElement('button'),
        i = document.createElement('i');
    button.id = 'teamAdd';
    i.className = "fas fa-plus";
    i.style.color = 'white';
    button.appendChild(i);
    button.onclick=()=>{
        let div = addModal();
        let div22 = teamAddDiv();
        document.getElementById('center').appendChild(div);
        if(document.getElementById('modalContent')!=null && document.getElementById('modalContent').hasChildNodes()==true){
            document.getElementById('modalContent').innerHTML = '';
        }
        document.getElementById('content').appendChild(div22);
        div.style.display = "block";
        window.onclick = function (event) {
            if (event.target == div) {
                div.style.display = 'none';
                div22.remove();
            }
        }
        document.getElementById('cancel').onclick=()=>{
            div.style.display = 'none';
            div22.remove();
        }
        document.getElementById('ok').onclick=()=>{
            let input = document.getElementById('teamAddingInput');
            let newTeamName = input.value;
            localStorage.setItem(input.name ,newTeamName);
            div.style.display = 'none';
           div22.remove();
           let newAddedTeam = new object.NotPlayedTeam(newTeamName);
           notPlayedTeam.notPlayedTeams.push(newAddedTeam);
           utils.setItem('notPlayed',notPlayedTeam);
           console.log(createDiv(newAddedTeam,'notPlayed'));
           div.innerHTML = '';
           teamName();
        }
    }

    div.appendChild(button);
    return div;
}