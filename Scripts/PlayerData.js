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
    this.type;
    this.players=[];
    this.partnershipScore=0;
    this.addPartnershipScore=(score)=>{
        this.partnershipScore+=score;
    };
    this.totalScore=()=>{
        let total=0;
        for(let player of this.players){
            total = total+player.batting.run;
        }
        total = total+this.partnershipScore;
        return total;
    }

}
export function match(){
    this.matchNo = 0;
    this.addMatchNo=()=>{
        this.matchNo++;
    };
    this.hostTeam = new team();
    this.visitorTeam = new team();
}

export  function Games(){
    this.id = 'gameId';
    this.matches = [];
}