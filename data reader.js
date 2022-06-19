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
        this.trackIDObj = {0x08: "Luigi Circuit", 0x01: 'Moo Moo Meadows', 0x02: 'Mushroom Gorge', 0x04: "Toad's Factory",
                            0x00: "Mario Circuit", 0x05: 'Coconut Mall', 0x06: 'DK Summit', 0x07: "Wario's Gold Mine",
                            0x09: 'Daisy Circuit', 0x0F: 'Koopa Cape', 0x0B: 'Maple Treeway', 0x03: 'Grumble Volcano',
                            0x0E: 'Dry Dry Ruins', 0x0A: 'Moonview Highway', 0x0C: "Bowser's Castle", 0x0D: 'Rainbow Road',
                            0x10: 'GCN Peach Beach', 0x14: 'DS Yoshi Falls', 0x19: 'SNES Ghost Valley 2', 0x1A: 'N64 Mario Raceway',
                            0x1B: 'N64 Sherbet Land', 0x1F: 'GBA Shy Guy Beach', 0x17: 'DS Delfino Square', 0x12: 'GCN Waluigi Stadium',
                            0x15: 'DS Desert Hills', 0x1E: 'GBA Bowser Castle 3', 0x1D: "N64 DK's Jungle Parkway", 0x11: 'GCN Mario Circuit',
                            0x18: 'SNES Mario Circuit 3', 0x16: 'DS Peach Gardens', 0x13: 'GCN DK Mountain', 0x1C: "N64 Bowser's Castle"}
    }


    //current adds a time to the object with list of playerTimes taking an object as input with certain fields filled in
    //addPlayerTime(input: {track: str, time: str, lap1: str, lap2: str, lap3: str}):
    addPlayerTime(input) {
        let found = false;
        for (let cup in this.trackList){
            if (input.track in this.trackList[cup]){
                found = true;
                if (!this.trackList[cup][input.track]){
                    if (this.checkValidFormat(input.time)){
                        this.trackList[cup][input.track] = input.time;
                    }
                    else {
                        alert('Please use a valid time format');
                    }
                }
            }
        }
    }

    //checks if the input for a player time is in a valid format
    //checkValidFormat(time: str): Boolean
    checkValidFormat(time){
        let timeArr = time.split('');
        if (timeArr.indexOf(':') !== -1){
            for (let index = 0; index < timeArr.length; ++index){
                if (timeArr[index] === ':'){
                    if (index !== 1){
                        return false;
                    }
                }
                else if (timeArr[index] === '.'){
                    if (index !== 4){
                        return false;
                    }
                }
                else if (timeArr[index].charCodeAt(0) < '0'.charCodeAt(0) || timeArr[index].charCodeAt(0) > '9'.charCodeAt(0)) {
                        return false;
                    }
                }
            }
        else {
            for (let index = 0; index < timeArr.length; ++index){
                if (index === 3 && timeArr[index] !== '.'){
                    return false;
                }
                else if (timeArr[index].charCodeAt(0) < '0'.charCodeAt(0) || timeArr[index].charCodeAt(0) > '9'.charCodeAt(0)){
                    return false;
                }
            }
        }
        return true;
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

    //reads the standard data from an RKG file
    //parseRKG(input: Binary String)
    parseRKG(input){
        let inputArr = input.split('');
        let relevantData = inputArr.slice(0, 8);
        let fileTypeArr = relevantData.slice(0, 4);
        let fileTypeCheck = fileTypeArr.join('');
        if (fileTypeCheck !== 'RKGD'){
            alert('this is not a valid ghost file');
            return;
        }
        let hexArr = relevantData.map(function(char){
            return char.charCodeAt(0);
        });
        let totalMinutes = hexArr[4] >> 1;
        let totalSeconds = ((hexArr[4] & 1) << 1) + (hexArr[5] >> 2);
        let totalMS = ((hexArr[5] & 3) << 8) + hexArr[6];
        document.getElementById('time').value = `${totalMinutes}` + ':' + `${totalSeconds}`.padStart(2, '0') + '.' + `${totalMS}`.padStart(3, '0');
        let track = ((hexArr[7] >> 2) & 63);
        document.getElementById('trackInput').value = this.trackIDObj[track];
    }

    //renders all the listed tracks in a grid layout
    //render(element: document tag): 
    render(element){
        element.innerHTML = '';
        let counter = 0;
        let newRow = undefined;
        for (let cup in this.trackList){
            if (counter % 4 === 0) {
                newRow = document.createElement('div');
                newRow.classList.add('row');
                // newRow.classList.add('border');
                element.appendChild(newRow);
            }
            const newCup = document.createElement('div');
            newCup.innerText = cup;
            newCup.classList.add('col-sm-6');
            newCup.classList.add('col-md-6');
            newCup.classList.add('col-lg-6');
            //newCup.classList.add('border');
            for (let track in this.trackList[cup]){
                let newTrack = document.createElement('div');
                newTrack.id = track;
                newTrack.classList.add('row');
                //newTrack.classList.add('border');
                newCup.appendChild(newTrack);
                let trackName = document.createElement('div');
                trackName.classList.add('border');
                trackName.classList.add('col');
                trackName.innerText = track;
                let time = document.createElement('div');
                time.classList.add('border');
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
