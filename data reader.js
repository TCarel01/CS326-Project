export class dataReader {

    constructor(){
        this.player1Times = {};
        this.player2Times = {};
        this.trackList = {Mushroom: {'Luigi Circuit': null, "Moo Moo Meadows": null, 'Mushroom Gorge': null, "Toad's Factory": null},
                            Flower: {'Mario Circuit': null, "Coconut Mall": null, "DK Summit": null, "Wario's Gold Mine": null},
                            Star: {'Daisy Circuit': null, 'Koopa Cape': null, 'Maple Treeway': null, 'Grumble Volcano': null},
                            Special: {'Dry Dry Ruins': null, 'Moonview Highway': null, "Bowser's Castle": null, "Rainbow Road": null},
                            Shell: {'GCN Peach Beach': null, 'DS Yoshi Falls': null, 'SNES Ghost Valley 2': null, 'N64 Mario Raceway': null},
                            Banana: {'N64 Sherbet Land': null, 'GBA Shy Guy Beach': null, 'DS Delfino Square': null, 'GCN Waluigi Stadium': null},
                            Leaf: {'DS Desert Hills': null, 'GBA Bowser Castle 3': null, "N64 DK's Jungle Parkway": null, 'GCN Mario Circuit': null},
                            Lightning: {'SNES Mario Circuit 3': null, 'DS Peach Gardens': null, 'GCN DK Mountain': null, "N64 Bowser's Castle": null}};
    }


    //current adds a time to the object with list of playerTimes taking an object as input with certain fields filled in
    //addPlayerTime(player: number, input: {track: str, time: str, lap1: str, lap2: str, lap3: str}):
    addPlayerTime(player, input) {
        let curTrack = input.track;
        if (!(curTrack in this.trackList)){
            this.trackList[curTrack] = undefined;
        }
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
        if (!(track in this.player1Times) && !(track in this.player2Times)){
            return "at least one player does not have a time here";
        }
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
        else {
            returnStr += "+";
        }
        let msDif = Math.floor(timeDifference % 1000);
        Math.floor(timeDifference /= 1000);
        let secDif = Math.floor((timeDifference % 60));
        Math.floor(timeDifference /= 60);
        let minDif = Math.floor(timeDifference);
        returnStr += `${minDif}`.padStart(1, "0") + ':' + `${secDif}`.padStart(2, "0") + '.' + `${msDif}`.padStart(3, "0");
        return returnStr;
    }

    //inserts a new option to select in the drop down menu, to be called in an eventListener
    //insertTrack(track: str):
    insertTrack(track){
        if (!(track in this.trackList)){
            let element = document.getElementById("track");
            element.insertAdjacentHTML("beforeend", "<option value="+ track + ">" + track + "</option>");
        }
    }

    //renders all the listed tracks in a grid layout
    //render(element: document tag): 
    render(element){
        let counter = 0;
        let newRow = undefined;
        for (let cup in this.trackList){
            if (counter % 4 === 0) {
                newRow = document.createElement('div');
                newRow.classList.add('row');
                newRow.classList.add('border-left');
                newRow.classList.add('border-top');
                element.appendChild(newRow);
            }
            const newCup = document.createElement('div');
            newCup.innerText = cup;
            newCup.classList.add('col-sm-3');
            newCup.classList.add('col-md-3');
            newCup.classList.add('col-lg-3');
            //newCup.classList.add('border');
            for (let track in this.trackList[cup]){
                let newTrack = document.createElement('div');
                newTrack.id = track;
                newTrack.classList.add('row');
                //newTrack.classList.add('border');
                newCup.appendChild(newTrack);
                let trackName = document.createElement('div');
                //trackName.classList.add('border');
                trackName.classList.add('col');
                trackName.innerText = track;
                let time = document.createElement('div');
                //time.classList.add('border');
                time.classList.add('col');
                time.innerText = this.trackList[cup][track];
                newTrack.appendChild(trackName);
                newTrack.appendChild(time);
            }
            newRow.appendChild(newCup);
            ++counter;
        }
    }
}

let a = new dataReader();
console.assert(a.convertStrToMS("1:43.724") === 103724);
a.addPlayerTime(1, {track: "MH", time: "1:43.724"});
a.addPlayerTime(2, {track: "MH", time: "1:43.725"});
console.assert(a.compareTimes("MH", "time") === '-0:00.001');
