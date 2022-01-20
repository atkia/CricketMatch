let player={
    name:localStorage.getItem("strikerName"),
    run:0,
    type:"",
    ballNumber:0,
    numberOfFour:0,
    numberOfSix:0,
    sR (){
        return this.run/this.ballNumber;
    }
}
let player2= Object.assign({},player);
player2.name=localStorage.getItem('nonStrikerName');
console.log(player)
console.log(player2)
let team={
    name:localStorage.getItem("hostTName"),
    players:[],
    tRun (){
        let run=0;
        console.log(this.players[0].run)
        for (let player of this.players) {
            run = run + player.run;

        }
        console.log(run);
        return run;
    },
    wicket:0
}
function run(value){
    player.run=player.run+value;
    console.log(player.run);
    document.getElementById("runScore").innerText= player.run;
    //getRun();
}
function addPlayer(player){
    team.players.push(player);
}
function getTeamName(){
    return localStorage.getItem("hostTName");
}
function getRun(){
    return player.run;
}
addPlayer(player);
addPlayer(player2);
document.getElementById("teamName").innerText = getTeamName();

console.log(player.run);


