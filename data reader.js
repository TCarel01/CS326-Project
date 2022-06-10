class dataReader {

    constructor(){
        this.playerTimes = {}
    }


    //current adds a time to the object with list of playerTimes taking an object as input with certain fields filled in
    //addPlayerTime(input: {track: str, time: str, lap1: str, lap2: str, lap3: str}):
    addPlayerTime(input) {
        let curTrack = input.track;
        this.playerTimes[curTrack].time = input.time;
        this.playerTimes[curTrack].lap1 = input.lap1;
        this.playerTimes[curTrack].lap2 = input.lap2;
        this.playerTimes[curTrack].lap3 = input.lap3;
    }

}