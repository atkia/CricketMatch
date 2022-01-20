class Team{
    constructor(name) {
        this.name = name;
        this.players= [];
        this.matchNo=0;
        this.winNo=0;
        this.lostNo=0;
        this.totalRun = 0;
        this.wicket =0;
    }
    getTeamName(){
        return this.name;
    }
    getTotalRun(value){
         this.totalRun+=value;
         return this.totalRun;
    }

}