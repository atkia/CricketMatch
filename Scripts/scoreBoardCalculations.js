import * as teams from './SelectOpeningPlayer';
let teamName1,teamName2;
// let tossWonBy = localStorage.getItem("tossWonBy");
// let strikerName= localStorage.getItem("strikerName");
// let bowler = localStorage.getItem("bowlerName");
// console.log(strikerName);
// console.log(bowler);
// let nonStrikerName = localStorage.getItem("nonStrikerName");
// if(tossWonBy=="visitorTeam"){
//     teamName1 = localStorage.getItem("visitorTName");
//     teamName2 = localStorage.getItem("hostTName");
// }
// else {
//     teamName1 = localStorage.getItem("hostTName");
//     teamName2 = localStorage.getItem("visitorTName")
// }
// let team = new Team(teamName1);
// let team2 = new Team(teamName2);
// let player1 = new Player(strikerName);
// let player2 = new Player(nonStrikerName);
// let player3 = new Player(bowler);
// let batsman1 = new Batting();
// let batsman2 = new Batting();
// let bowler1 = new Bowling();
// player1.battings.push(batsman1);
// player2.battings.push(batsman2);
// player3.bowlings.push(bowler1);
// console.log(player1);
// team.players.push(player1);
// console.log(team);
// team.players.push(player2);
// team2.players.push(player3);



let c=0;
let over =0;
function run(value){
    if(c>=6){
        c=0;
        over++;
    }
    c++;
    console.log(c);
    batsman1.ballNo++;
    document.getElementById("ball"+c).innerText= value;
    document.getElementById("1run").innerText =  player1.battings[0].totalRun(value);
    document.getElementById("runScore").innerText = team.getTotalRun(value);
    document.getElementById("runGiven").innerText = player3.bowlings[0].getRunGiven(value);
    document.getElementById("over").innerText = over+"."+c;
    if(c==6){
        //  alert("One over is done...");
        document.getElementById("ball1").innerText = "";
        document.getElementById("ball2").innerText = "";
        document.getElementById("ball3").innerText = "";
        document.getElementById("ball4").innerText = "";
        document.getElementById("ball5").innerText = "";
        document.getElementById("ball6").innerText = "";
    }
}

document.getElementById("teamName").innerText = team.getTeamName();
document.getElementById("strikerName").innerText = team.players[0].playerName;
document.getElementById("nonStrikerName").innerText = team.players[1].playerName;
document.getElementById("bowlerName").innerText = team2.players[0].playerName;