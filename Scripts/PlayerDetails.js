import {Batting} from "./PlayerData.js";
import * as utils from './LocalStorageUtils.js';
let TeamName,Player;
let games = utils.getItem('gameId');

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/playerDetails.css";
    head.appendChild(link);
}

function createSpan(id1,text,id2,value){
    let span1 = document.createElement('span'),
        span2 = document.createElement('span');
    span1.id = id1;
    span1.innerText = text;
    span2.id = id2;
    span2.innerText = value;
    span1.appendChild(span2);
    return span1;
}
function battingCount(){
    let info = [];
    let matchNo = 0,
        innings = 0,
        run = 0,
        notOuts = 0,
        scores = [],
        bestScore = 0,
        sr = 0,
        avg = 0,
        fours = 0,
        sixes = 0,
        thirties = 0,
        fifties = 0,
        hundreds = 0,
        ducks = 0;
    for (let i=0;i<games.matches.length;i++){
        console.log(i);
        if(games.matches[i].innings[0].battingTeam.teamName == TeamName){
            for(let j =0;j<games.matches[i].innings[0].battingTeam.players.length;j++){
                if(games.matches[i].innings[0].battingTeam.players[j].playerName == Player.playerName){
                    console.log(Player.playerName);
                    matchNo++;
                    innings++;
                    console.log(matchNo);
                    scores.push(games.matches[i].innings[0].battingTeam.players[j].batting.run);
                    run = run + games.matches[i].innings[0].battingTeam.players[j].batting.run;
                    console.log(+games.matches[i].innings[0].battingTeam.players[j].batting.sr );
                    sr =+games.matches[i].innings[0].battingTeam.players[j].batting.sr + sr;
                    console.log(sr);
                    if(games.matches[i].innings[0].battingTeam.players[j].batting.status == 'Not Out'){
                        notOuts++;
                    }
                    if(games.matches[i].innings[0].battingTeam.players[j].batting.run>30){
                        thirties++;
                    }
                    if(games.matches[i].innings[0].battingTeam.players[j].batting.run>50){
                        fifties++;
                    }
                    if(games.matches[i].innings[0].battingTeam.players[j].batting.run>100){
                        hundreds++;
                    }
                    fours = fours+ games.matches[i].innings[0].battingTeam.players[j].batting.fours;
                    sixes = sixes + games.matches[i].innings[0].battingTeam.players[j].batting.sixs;
                    console.log(matchNo);
                }
            }
        }
        if(games.matches[i].innings[1].battingTeam.teamName == TeamName){
            for(let j =0;j<games.matches[i].innings[1].battingTeam.players.length;j++){
                if(games.matches[i].innings[1].battingTeam.players[j].playerName == Player.playerName){
                    matchNo++;
                    innings++;
                    console.log(Player.playerName);
                    console.log(matchNo);
                    scores.push(games.matches[i].innings[1].battingTeam.players[j].batting.run);
                    run = run + games.matches[i].innings[1].battingTeam.players[j].batting.run;
                    console.log(+games.matches[i].innings[1].battingTeam.players[j].batting.sr );
                    sr =+games.matches[i].innings[1].battingTeam.players[j].batting.sr + sr;
                    console.log(sr);
                    if(games.matches[i].innings[1].battingTeam.players[j].batting.status == 'Not Out'){
                        notOuts++;
                    }
                    if(games.matches[i].innings[1].battingTeam.players[j].batting.run>30){
                        thirties++;
                    }
                    if(games.matches[i].innings[1].battingTeam.players[j].batting.run>50){
                        fifties++;
                    }
                    if(games.matches[i].innings[1].battingTeam.players[j].batting.run>100){
                        hundreds++;
                    }
                    fours = fours+ games.matches[i].innings[1].battingTeam.players[j].batting.fours;
                    sixes = sixes + games.matches[i].innings[1].battingTeam.players[j].batting.sixs;
                    console.log(matchNo);
                }
            }
        }
    }
    for (let i=0;i<scores.length;i++){
       if(scores[i]>bestScore){
           bestScore = scores[i];
       }
    }
    avg = avg.toPrecision(4);
    sr = sr/innings;
    sr = sr.toPrecision(5);
    info.push(matchNo);
    info.push(innings);
    info.push(run);
    info.push(notOuts);
    info.push(bestScore);
    info.push(sr);
    info.push(avg);
    info.push(fours);
    info.push(sixes);
    info.push(thirties);
    info.push(fifties);
    info.push(hundreds);
    info.push(ducks);
    return info;
}

function battingDiv(){
    let info = battingCount();
    console.log(info);
    let div = document.createElement('div');
    let table = document.createElement('table'),
        tr1 = document.createElement('tr'),
        tr2 = document.createElement('tr'),
        tr3 = document.createElement('tr'),
        tr4 = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        td7 = document.createElement('td'),
        td8 = document.createElement('td'),
        td9 = document.createElement('td'),
        td10 = document.createElement('td'),
        td11 = document.createElement('td'),
        td12= document.createElement('td'),
        td13= document.createElement('td');


    td1.appendChild(createSpan('match','Matches','matchValue',info[0]));
    // div.appendChild(createSpan('matchValue',info[0]));
    td2.appendChild(createSpan('innings','Innings','inValue',info[1]));
    // div.appendChild(createSpan('inValue',info[1]));
    td3.appendChild(createSpan('run','Runs','runValue',info[2]));
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);

    // div.appendChild(createSpan('runValue',info[2]));
    td4.appendChild(createSpan('noOuts','Not Outs','noValue',info[3]));
    // div.appendChild(createSpan('noValue',info[3]));
    td5.appendChild(createSpan('bestScore','Best Score','bestScoreValue',info[4]));
    // div.appendChild(createSpan('bestScoreValue',info[4]));
    td6.appendChild(createSpan('sr','Strike Rates','srValue',info[5]));
    tr2.appendChild(td4);
    tr2.appendChild(td5);
    tr2.appendChild(td6);
    // div.appendChild(createSpan('srValue',info[5]));
    td7.appendChild(createSpan('avg','Average','avgValue',info[6]));
    // div.appendChild(createSpan('avgValue',info[6]));
    td8.appendChild(createSpan('fours','Fours','foursValue',info[7]));
    // div.appendChild(createSpan('foursValue',info[7]));
    td9.appendChild(createSpan('six','Sixes','sixValue',info[8]));
    tr3.appendChild(td7);
    tr3.appendChild(td8);
    tr3.appendChild(td9);
    // div.appendChild(createSpan('sixValue',info[8]));
    td10.appendChild(createSpan('thirties','Thirties','thirtiesValue',info[9]));
    // div.appendChild(createSpan('thirtiesValue',info[9]));
    td11.appendChild(createSpan('fifties','Fifties','fiftiesValue',info[10]));
    // div.appendChild(createSpan('fiftiesValue',info[10]));
    td12.appendChild(createSpan('hundreds','Hundreds','hundredValue',info[11]));
    tr4.appendChild(td10);
    tr4.appendChild(td11);
    tr4.appendChild(td12);
    // div.appendChild(createSpan('hundredValue',info[11]));
    td13.appendChild(createSpan('duck','Ducks','duckValue',info[12]));
    // div.appendChild(createSpan('duckValue',info[12]));
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    div.appendChild(table);
    return div;
}
function bowlingDiv(player){}
function fieldingDiv(player){}
export function createPlayerDetailsDiv(teamName,player){
    addLink();
    TeamName = teamName;
    Player = player;
    let div = document.createElement('div'),
        div1 = document.createElement('div'),
        div2 = document.createElement('div'),
        div3 = document.createElement('div'),
        img = document.createElement('img'),
        img0 = document.createElement('img'),
    h1 = document.createElement('h1'),
    span1 = document.createElement('span'),
        span2 = document.createElement('span'),
        br = document.createElement('br'),
        span3 = document.createElement('span');
    div.id = 'playerDetailDiv';
    div1.id = 'headingD';
    img0.src = 'https://pixabay.com/static/uploads/photo/2012/04/15/21/34/arrow-35386_960_720.png';
    img0.id = 'backArrow';
    img.id = 'personIcon';
    img.src = 'https://www.pngkit.com/png/full/14-141902_person-icon-png.png';
    h1.innerText = player.playerName;
    div1.appendChild(img0);
    div1.appendChild(br);
    div1.appendChild(img);
    div1.appendChild(h1);
    div2.id = 'selectionDiv';
    span1.id = 'batting';
    span1.innerText = 'Batting';
    span1.onclick = ()=>{
        div3.innerHTML = '';
        div3.appendChild(battingDiv(player.batting));
    }
    span2.id = 'bowling';
    span2.innerText = 'Bowling';
    span2.onclick = ()=>{
        div3.innerHTML = '';
        div3.appendChild(bowlingDiv(player.bowling));
    }
    span3.id = 'fielding';
    span3.innerText = 'Fielding';
    span3.onclick = ()=>{
        div3.innerHTML = '';
        div3.appendChild(fieldingDiv(player.fielding));
    }
    div2.appendChild(span1);
    div2.appendChild(span2);
    div2.appendChild(span3);
    div3.appendChild(battingDiv(player.batting));
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    return div;
}