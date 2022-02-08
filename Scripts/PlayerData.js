// import {hostTeam, visitorTeam} from "./SelectOpeningPlayer";

export function Extras(){
    this.byes=0;
    this.lByes =0;
    this.wB = 0;
    this.noBall = 0;
    this.penalty = 0;
    // this.addByes = (value)=>{
    //     this.byes = this.byes+value;
    //
    // }
    // this.getByes = ()=>{
    //     return this.byes+'B';
    // }
    // this.addLB = (value)=>{
    //     this.lByes = this.lByes+value;
    // }
    // this.getLB=()=>{
    //     return this.lByes+'LB';
    // }
    // this.addWB = (value)=>{
    //     this.wB = this.wB+value;
    // }
    // this.getWB=()=>{
    //     return this.wB+'WB';
    // }
    // this.addNB = (value)=>{
    //     this.noBall = this.noBall+value;
    // }
    // this.getNB=()=>{
    //     return this.noBall+'NB';
    // }
    // this.addPenalty = (value)=>{
    //     this.penalty = this.penalty+value;
    // }
    // this.getPenalty=()=>{
    //     return this.penalty+'P';
    // }
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
export function Batting(){
    this.run=0;
    this.ballNo=0;
    this.fours=0;
    this.sixs=0;
    this.sr = 0.00;
    this.retire = false;
    this.status = 'Not Out';
    // this.changeStatus=()=>{
    //     this.status = 'Out';
    // }
    // this.getRuns=(run)=>{
    //     this.run+=run;
    // };
    // this.sR=()=>{
    //     if(this.ballNo!=0){
    //         this.sr = (this.run/this.ballNo)*100;
    //         this.sr = this.sr.toPrecision(5);
    //         return this.sr;
    //     }
    //
    //     return '' +this.sr;
    // }

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
    this.ballDetails = [];
    // this.getRuns=(run)=>{
    //     this.run+=run;
    // };
    // this.getMaiden = ()=>{
    //     if(this.run ==0){
    //         this.maiden++;
    //     }
    //     return this.maiden;
    // }
    // this.getOver=()=>{
    //     if(this.ballNo<6){
    //         this.overs = "0."+this.ballNo;
    //     }
    //     else{
    //         let over = Math.floor( this.ballNo/6),
    //             ball = this.ballNo%6;
    //         this.overs =''+ over +'.'+ball;
    //     }
    // }
    // this.eR=()=>{
    //     if(this.ballNo!=0){
    //         this.er= this.run/this.ballNo;
    //         this.er=this.er*6;
    //         this.er = this.er.toPrecision(5);
    //         return this.er;
    //     }
    //     return ''+this.er;
    //
    // }
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
        er = er.toPrecision(5);
        return er;
    }
    return ''+er;

}

export function player (name,type) {
    this.playerName = name;
    this.type=type;
    this.batting = new Batting();
    this.bowling = new Bowling();
};
export function team (name) {
    this.wicket = 0;
    this.totalOver = '0.0';
    this.teamName = name;
    this.players=[];
    this.partnershipScore=0;
    this.totalScore = 0;
    this.extras = new Extras();
    // this.addPartnershipScore=(score)=>{
    //     console.log("add Partnership function called")
    //     this.partnershipScore=this.partnershipScore+score;
    // }
    //
    // this.getTotalOver=()=>{
    //     for(let player of this.players){
    //         if(player.type=='bowling'){
    //             this.totalOver = player.bowling.overs;
    //         }
    //     }
    // }

    // this.getTotalScore=()=>{
    //   //  let total=0;
    //     for(let player of this.players){
    //         this.totalScore =  this.totalScore+player.batting.run;
    //     }
    //     this.totalScore =  this.totalScore+this.partnershipScore;
    //     console.log("PartnershipScore..."+this.partnershipScore);
    //   //  return  this.totalScore;
    // }


}

export function addPartnershipScore(partnershipScore,score){
    console.log("add Partnership function called");
    partnershipScore=partnershipScore+score;
    return partnershipScore;
}

export function getTotalOver(players,totalOver){
    let over = 0.0;
    for(let player of players){
        if(player.type=='bowling'){
            over =over+ +player.bowling.overs;
        }
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

export function Inning(){
    this.winnerTeamName = '';
    this.losserTeamName ='';
    this.battingTeam = new team();
    this.bowlingTeam = new team();
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
}
export  function Games(){
    this.id = 'gameId';
    this.matches = [];
}