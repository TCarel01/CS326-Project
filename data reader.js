class dataReader {

    constructor(){
        this.player1Times = {};
        this.player2Times = {};
    }


    //current adds a time to the object with list of playerTimes taking an object as input with certain fields filled in
    //addPlayerTime(player: number, input: {track: str, time: str, lap1: str, lap2: str, lap3: str}):
    addPlayerTime(player, input) {
        let curTrack = input.track;
        if (player === 1){
            this.player1Times[curTrack].time = input.time;
            this.player1Times[curTrack].lap1 = input.lap1;
            this.player1Times[curTrack].lap2 = input.lap2;
            this.player1Times[curTrack].lap3 = input.lap3;
        }
        else if (player === 2) {
            this.player2Times[curTrack].time = input.time;
            this.player2Times[curTrack].lap1 = input.lap1;
            this.player2Times[curTrack].lap2 = input.lap2;
            this.player2Times[curTrack].lap3 = input.lap3;
        }
    }


    //takes as input the time and converts it to the time in total milliseconds
    //convertStrToMS(time: str): number
    convertStrToMS(time){
        let timeArr = time.split(/[:.]+/);
        let timeList = [];
        timeList.push(parseInt(timeArr[0]) * 60000);
        timeList.push(parseInt(timeArr[1]) * 1000);
        timeList.push(parseInt(timeArr[2]) * 100);
        timeList.push(parseInt(timeArr[3]) * 10);
        timeList.push(parseInt(timeArr[4]));
        let totalMS = timeList.reduce((acc, e) => acc += e, 0);
        return totalMS;
    }
}