// import {hostTeam, visitorTeam} from "./SelectOpeningPlayer";

export function Extras(){
    this.byes=0;
    this.lByes =0;
    this.wB = 0;
    this.noBall = 0;
    this.penalty = 0;
}

export function addByes(byes,value){
    byes = byes+value;
    return byes;
}
export function getByes (byes){
    return byes+'B';
}
export function addLB(value,lByes){
    lByes = lByes+value;
    return lByes;
}
export function getLB(lByes){
    return lByes+'LB';
}
export function addWB(wB,value){
    wB = wB+value;
    return wB;
}
export function getWB(wB){
    return wB+'WB';
}
export function addNB(noBall,value){
    noBall = noBall+value;
    return noBall;
}
export function getNB(noBall){
    return noBall+'NB';
}
export function addPenalty(penalty,value){
    penalty = penalty+value;
    return penalty;
}
export function getPenalty(penalty){
    return penalty+'P';
}

export function fielding(){
    this.catches = 0;
    this.stumpongs = 0;
    this.runOuts = 0;
}
export function Batting(){
    this.run=0;
    this.ballNo=0;
    this.fours=0;
    this.sixs=0;
    this.sr = 0.00;
    this.retire = false;
    this.status = 'Not Out';
}

export function crr(players){
    let crr=0;
    for(let i=0;i<players.length;i++){
        crr =crr+ +players[i].bowling.er ;
        console.log(crr);
    }
    if(players.length==0){
        return crr+'.00';
    }
    console.log(crr);
    crr = crr/players.length;
    console.log(crr);
    return crr.toPrecision(4);
}
export function changeStatus(status){
    status = 'Out';
    return status;
}

export function sR(ballNo,sr,run){
    if(ballNo!=0){
        sr = (run/ballNo)*100;
        sr = sr.toPrecision(5);
        return sr;
    }

    return '' +sr;
}

export function ballDetail(value,type){
    console.log(value+' '+type);
    this.ballValue = value;
    this.type = type;
}

export function Bowling(){
    this.wickets=0;
    this.run = 0;
    this.ballNo= 0;
    this.overs='0.0';
    this.maiden=0;
    this.er = 0.00;
    this.wides = 0;
    this.noBall =0;
    this.dotsBall = 0;
    this.ballDetails = [];
}

export function getRuns(totalRun,run){
    totalRun = totalRun+run;
    return totalRun;
}

export function getOver(ballNo,overs){
    if(ballNo<6){
        overs = "0."+ballNo;
        return overs;
    }
    else{
        let over = Math.floor( ballNo/6),
            ball = ballNo%6;
        overs =''+ over +'.'+ball;
        return overs;
    }
}

export function getMaiden(run,maiden){
    if(run ==0){
        maiden++;
    }
    return maiden;
}
export function eR(er,ballNo,run){
    if(ballNo!=0){
        er= run/ballNo;
        er=er*6;
        er = er.toPrecision(4);
        return er;
    }
    return ''+er;

}

export function player (name,type) {
    this.playerName = name;
    this.type=type;
    this.batting = new Batting();
    this.bowling = new Bowling();
    this.fielding = new fielding();
};
export function team (name) {
    this.wicket = 0;
    this.totalOver = '0.0';
    this.teamName = name;
    this.players=[];
    this.partnershipScore=0;
    this.totalScore = 0;
    this.extras = new Extras();
    this.partnerShips = [];
    this.crr = 0;
}

export function addPartnershipScore(partnershipScore,score){
    console.log("add Partnership function called");
    partnershipScore=partnershipScore+score;
    return partnershipScore;
}

export function getTotalOver(players){
    let over = 0;
    for(let player of players){
        if(player.type=='bowling'){
            over =over+ +player.bowling.overs;
        }
    }
    if(Number.isInteger(over) ){
        return over+'.0';
    }
    return over;
}
export function getTotalScore(players,partnershipScore){
    let totalScore = 0;
    for(let player of players){
        totalScore =  totalScore+player.batting.run;
    }
    totalScore =  totalScore+partnershipScore;
    return totalScore;
}
export function partnership(name1,name2){
    this.player1Name = name1;
    this.player2Name = name2;
    this.player1Run = 0;
    this.player2Run = 0;
    this.player1Ball = 0;
    this.player2Ball = 0;
    // this.totalRun = player1.batting.run+player2.batting.run;
    // this.totalBall = player1.batting.ballNo+player2.batting.ballNo;
    this.extra = 0;
}
export function Inning(){
    this.battingTeam = new team();
    this.bowlingTeam = new team();
}
export function getRequiredRunRate(run,ball){
    let rr = 0;
    rr = run/ball;
    rr = rr*6;
    return rr.toPrecision(4);
}
export function match(){
    this.date = 0;
    this.time =0;
    this.matchIndex =0;
    this.inningIndex = 0;
    this.matchOvers = 0;
    this.tossWonBy = '';
    this.optedTo = '';
    this.innings=[];
    this.matchStatus = 'running';
    this.winnerTeamName = '';
    this.losserTeamName ='';
    this.matchDetails = '';
}
export  function Games(){
    this.id = 'gameId';
    this.matches = [];
}