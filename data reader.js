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
            this.player1Times[curTrack] = {time: input.time, lap1: null, lap2: null, lap3: null};
        }
        else if (player === 2) {
            this.player2Times[curTrack] = {time: input.time, lap1: null, lap2: null, lap3: null};
        }
    }


    //takes as input the time and converts it to the time in total milliseconds
    //convertStrToMS(time: str): number
    convertStrToMS(time){
        let timeArr = time.split(/[:.]+/);
        let timeList = [];
        timeList.push(parseInt(timeArr[0]) * 60000);
        timeList.push(parseInt(timeArr[1]) * 1000);
        timeList.push(parseInt(timeArr[2]));
        let totalMS = timeList.reduce((acc, e) => acc += e, 0);
        return totalMS;
    }

    //compares two player times and returns a string presenting the time difference between the two players
    //compareTimes(track: str, split: str): String
    compareTimes(track, split){
        let p1Time = this.convertStrToMS(this.player1Times[track][split]);
        let p2Time = this.convertStrToMS(this.player2Times[track][split]);
        let timeDifference = p1Time - p2Time;
        let returnStr = ''
        if (timeDifference === 0){
            return '0.000';
        }
        else if (timeDifference < 0){
            returnStr += '-';
            timeDifference *= -1;
        }
        let msDif = Math.floor(timeDifference % 1000);
        Math.floor(timeDifference /= 1000);
        let secDif = Math.floor((timeDifference % 60));
        Math.floor(timeDifference /= 60);
        let minDif = Math.floor(timeDifference);
        returnStr += `${minDif}`.padStart(1, "0") + ':' + `${secDif}`.padStart(2, "0") + '.' + `${msDif}`.padStart(3, "0");
        return returnStr;
    }
}

let a = new dataReader();
console.assert(a.convertStrToMS("1:43.724") === 103724);
a.addPlayerTime(1, {track: "MH", time: "1:43.724"});
a.addPlayerTime(2, {track: "MH", time: "1:43.725"});
console.assert(a.compareTimes("MH", "time") === '-0:00.001');
