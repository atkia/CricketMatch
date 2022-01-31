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
    this.getRuns=(run)=>{
        this.run+=run;
    };
    this.sR=()=>{
        let sr=0.00;
        if(this.ballNo!=0){
            sr = (this.run/this.ballNo)*100;
            return sr.toPrecision(5);
        }

        return ''+sr;
    }

}
export function Bowling(){
    this.wickets=0;
    this.run = 0;
    this.ballNo= 0;
    this.overs=0.0;
    this.maiden=0;
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
        let er=0.00;
        if(this.ballNo!=0){
            er = this.run/this.ballNo;
            er=er*6;
            return er.toPrecision(5);
        }
        return ''+er;

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
        console.log("add Partnership function called")
        this.partnershipScore=this.partnershipScore+score;
    }
    // this.totalBall=()=>{
    //     let ball = 0;
    //     for(let player of this.players){
    //         total = total+player.batting.run;
    //     }
    // }
    this.totalScore=()=>{
        let total=0;
        for(let player of this.players){
            total = total+player.batting.run;
        }
        total = total+this.partnershipScore;
        console.log("PartnershipScore..."+this.partnershipScore);
        return total;
    }
    this.extras = new Extras();

}

