// import {hostTeam, visitorTeam} from "./SelectOpeningPlayer";

export function Extras(){
    this.byes=0;
    this.lByes =0;
    this.wB = 0;
    this.noBall = 0;
    this.penalty = 0;
    this.addByes = (value)=>{
        this.byes = this.byes+value;

    }
    this.getByes = ()=>{
        return this.byes+'B';
    }
    this.addLB = (value)=>{
        this.lByes = this.lByes+value;
    }
    this.getLB=()=>{
        return this.lByes+'LB';
    }
    this.addWB = (value)=>{
        this.wB = this.wB+value;
    }
    this.getWB=()=>{
        return this.wB+'WB';
    }
    this.addNB = (value)=>{
        this.noBall = this.noBall+value;
    }
    this.getNB=()=>{
        return this.noBall+'NB';
    }
    this.addPenalty = (value)=>{
        this.penalty = this.penalty+value;
    }
    this.getPenalty=()=>{
        return this.penalty+'P';
    }
}
export function Batting(){
    this.run=0;
    this.ballNo=0;
    this.fours=0;
    this.sixs=0;
    this.sr = 0.00;
    this.retire = false;
    this.status = 'Not Out';
    this.changeStatus=()=>{
        this.status = 'Out';
    }
    this.getRuns=(run)=>{
        this.run+=run;
    };
    this.sR=()=>{
        if(this.ballNo!=0){
            this.sr = (this.run/this.ballNo)*100;
            this.sr = this.sr.toPrecision(5);
            return this.sr;
        }

        return '' +this.sr;
    }

}
export function Bowling(){
    this.wickets=0;
    this.run = 0;
    this.ballNo= 0;
    this.overs=0.0;
    this.maiden=0;
    this.er = 0.00;
    this.getRuns=(run)=>{
        this.run+=run;
    };
    this.getMaiden = ()=>{
        if(this.run ==0){
            this.maiden++;
        }
        return this.maiden;
    }
    this.getOver=()=>{
        if(this.ballNo<6){
            this.overs = "0."+this.ballNo;
        }
        else{
            let over = Math.floor( this.ballNo/6),
                ball = this.ballNo%6;
            this.overs = over +'.'+ball;
        }
    }
    this.eR=()=>{
        if(this.ballNo!=0){
            this.er= this.run/this.ballNo;
            this.er=this.er*6;
            this.er = this.er.toPrecision(5);
            return this.er;
        }
        return ''+this.er;

    }
}
export function player (name,type) {
    this.playerName = name;
    this.type=type;
    this.batting = new Batting();
    this.bowling = new Bowling();
};
export function team (name) {
    this.teamName = name;
  //  this.type;
    this.players=[];
    this.partnershipScore=0;
    this.addPartnershipScore=(score)=>{
        console.log("add Partnership function called")
        this.partnershipScore=this.partnershipScore+score;
    }
    this.totalScore = 0;
    this.getTotalScore=()=>{
      //  let total=0;
        for(let player of this.players){
            this.totalScore =  this.totalScore+player.batting.run;
        }
        this.totalScore =  this.totalScore+this.partnershipScore;
        console.log("PartnershipScore..."+this.partnershipScore);
      //  return  this.totalScore;
    }
    this.extras = new Extras();

}

export function Inning(){
    this.battingTeam = new team();
    this.bowlingTeam = new team();

    // this.hostTeam = new team();
    // this.visitorTeam = new team();
}

export function match(){
    this.index =0;
    this.innings=[];
   // this.hostTeam = new team();
   // this.visitorTeam = new team();

    //this.innings2 = new Inning();

    //this.innings1.push(hostTeam,visitorTeam);
   // this.innings2 = [];
   // this.innings2.push(hostTeam,visitorTeam);
}
export  function Games(){
    this.id = 'gameId';
    this.matches = [];
}