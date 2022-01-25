export function Batting(){
    this.run=0;
    this.ballNo=0;
    this.fours=0;
    this.sixs=0;
    this.getRuns=(run)=>{
        this.run+=run;
    };
    this.sR=()=>{
        let sr=0.0;
        if(this.ballNo!=0){
            sr = (this.run/this.ballNo)*100;
            return sr;
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
    function eR(){

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
    this.totalScore=()=>{
        let total=0;
        for(let player of this.players){
            total = total+player.batting.run;
        }
        return total;
    }
}

