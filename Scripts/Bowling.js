class Bowling{
    constructor() {
        this.matches = 0;
        this.innings = 0;
        this.overs = 0.0;
        this.maidens = 0;
        this.wickets = 0;
        this.runs = 0;
        this.eR = 0.0;
        this.noBalls = 0;
        this.dotsBalls =0
    }

    getRunGiven(run){
        this.runs+=run;
        return this.runs;
    }

}