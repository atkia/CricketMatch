class Batting{
    constructor() {
        this.matchNo =0;
        this.innings = 0;
        this.runs = 0;
        this.notOuts =0;
        this.bestScore = 0;
        this.sR = 0;
        this.average = 0;
        this.fours=0;
        this.sixes = 0;
        this.thirties = 0;
        this.fifties = 0;
        this.hundreds = 0;
        this.ducks =0;
        this.ballNo =0;
    }

    totalRun(run){
        this.runs=this.runs+run;
        return this.runs;
    }
    numberOf4s(value){
        this.fours++;
    }

}