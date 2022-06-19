export class dataReader {

    constructor(){
        this.player1Times = {};
        this.player2Times = {};
        this.trackList = {Mushroom: {'Luigi Circuit': {time: null, split1: null, split2: null, split3: null}, "Moo Moo Meadows": {time: null, split1: null, split2: null, split3: null}, 
                            'Mushroom Gorge': {time: null, split1: null, split2: null, split3: null}, "Toad's Factory": {time: null, split1: null, split2: null, split3: null}},
                            Flower: {'Mario Circuit': {time: null, split1: null, split2: null, split3: null}, "Coconut Mall": {time: null, split1: null, split2: null, split3: null},
                             "DK Summit": {time: null, split1: null, split2: null, split3: null}, "Wario's Gold Mine": {time: null, split1: null, split2: null, split3: null}},
                            Star: {'Daisy Circuit': {time: null, split1: null, split2: null, split3: null}, 'Koopa Cape': {time: null, split1: null, split2: null, split3: null}, 
                            'Maple Treeway': {time: null, split1: null, split2: null, split3: null}, 'Grumble Volcano': {time: null, split1: null, split2: null, split3: null}},
                            Special: {'Dry Dry Ruins': {time: null, split1: null, split2: null, split3: null}, 'Moonview Highway': {time: null, split1: null, split2: null, split3: null}, 
                            "Bowser's Castle": {time: null, split1: null, split2: null, split3: null}, "Rainbow Road": {time: null, split1: null, split2: null, split3: null}},
                            Shell: {'GCN Peach Beach': {time: null, split1: null, split2: null, split3: null}, 'DS Yoshi Falls': {time: null, split1: null, split2: null, split3: null},
                             'SNES Ghost Valley 2': {time: null, split1: null, split2: null, split3: null}, 'N64 Mario Raceway': {time: null, split1: null, split2: null, split3: null}},
                            Banana: {'N64 Sherbet Land': {time: null, split1: null, split2: null, split3: null}, 'GBA Shy Guy Beach': {time: null, split1: null, split2: null, split3: null},
                             'DS Delfino Square': {time: null, split1: null, split2: null, split3: null}, 'GCN Waluigi Stadium': {time: null, split1: null, split2: null, split3: null}},
                            Leaf: {'DS Desert Hills': {time: null, split1: null, split2: null, split3: null}, 'GBA Bowser Castle 3': {time: null, split1: null, split2: null, split3: null},
                             "N64 DK's Jungle Parkway": {time: null, split1: null, split2: null, split3: null}, 'GCN Mario Circuit': {time: null, split1: null, split2: null, split3: null}},
                            Lightning: {'SNES Mario Circuit 3': {time: null, split1: null, split2: null, split3: null}, 'DS Peach Gardens': {time: null, split1: null, split2: null, split3: null}, 
                            'GCN DK Mountain': {time: null, split1: null, split2: null, split3: null}, "N64 Bowser's Castle": {time: null, split1: null, split2: null, split3: null}}};
        this.trackIDObj = {0x08: "Luigi Circuit", 0x01: 'Moo Moo Meadows', 0x02: 'Mushroom Gorge', 0x04: "Toad's Factory",
                            0x00: "Mario Circuit", 0x05: 'Coconut Mall', 0x06: 'DK Summit', 0x07: "Wario's Gold Mine",
                            0x09: 'Daisy Circuit', 0x0F: 'Koopa Cape', 0x0B: 'Maple Treeway', 0x03: 'Grumble Volcano',
                            0x0E: 'Dry Dry Ruins', 0x0A: 'Moonview Highway', 0x0C: "Bowser's Castle", 0x0D: 'Rainbow Road',
                            0x10: 'GCN Peach Beach', 0x14: 'DS Yoshi Falls', 0x19: 'SNES Ghost Valley 2', 0x1A: 'N64 Mario Raceway',
                            0x1B: 'N64 Sherbet Land', 0x1F: 'GBA Shy Guy Beach', 0x17: 'DS Delfino Square', 0x12: 'GCN Waluigi Stadium',
                            0x15: 'DS Desert Hills', 0x1E: 'GBA Bowser Castle 3', 0x1D: "N64 DK's Jungle Parkway", 0x11: 'GCN Mario Circuit',
                            0x18: 'SNES Mario Circuit 3', 0x16: 'DS Peach Gardens', 0x13: 'GCN DK Mountain', 0x1C: "N64 Bowser's Castle"};
        if (window.localStorage.getItem('trackList')){
            this.trackList = JSON.parse(window.localStorage.getItem('trackList')).list;
        }
        window.localStorage.setItem('trackList', JSON.stringify({list: this.trackList}));
    }

    //clears the current trackList and local storage
    //clear()
    clear(){
        this.trackList = {Mushroom: {'Luigi Circuit': {time: null, split1: null, split2: null, split3: null}, "Moo Moo Meadows": {time: null, split1: null, split2: null, split3: null}, 
                            'Mushroom Gorge': {time: null, split1: null, split2: null, split3: null}, "Toad's Factory": {time: null, split1: null, split2: null, split3: null}},
                            Flower: {'Mario Circuit': {time: null, split1: null, split2: null, split3: null}, "Coconut Mall": {time: null, split1: null, split2: null, split3: null},
                             "DK Summit": {time: null, split1: null, split2: null, split3: null}, "Wario's Gold Mine": {time: null, split1: null, split2: null, split3: null}},
                            Star: {'Daisy Circuit': {time: null, split1: null, split2: null, split3: null}, 'Koopa Cape': {time: null, split1: null, split2: null, split3: null}, 
                            'Maple Treeway': {time: null, split1: null, split2: null, split3: null}, 'Grumble Volcano': {time: null, split1: null, split2: null, split3: null}},
                            Special: {'Dry Dry Ruins': {time: null, split1: null, split2: null, split3: null}, 'Moonview Highway': {time: null, split1: null, split2: null, split3: null}, 
                            "Bowser's Castle": {time: null, split1: null, split2: null, split3: null}, "Rainbow Road": {time: null, split1: null, split2: null, split3: null}},
                            Shell: {'GCN Peach Beach': {time: null, split1: null, split2: null, split3: null}, 'DS Yoshi Falls': {time: null, split1: null, split2: null, split3: null},
                             'SNES Ghost Valley 2': {time: null, split1: null, split2: null, split3: null}, 'N64 Mario Raceway': {time: null, split1: null, split2: null, split3: null}},
                            Banana: {'N64 Sherbet Land': {time: null, split1: null, split2: null, split3: null}, 'GBA Shy Guy Beach': {time: null, split1: null, split2: null, split3: null},
                             'DS Delfino Square': {time: null, split1: null, split2: null, split3: null}, 'GCN Waluigi Stadium': {time: null, split1: null, split2: null, split3: null}},
                            Leaf: {'DS Desert Hills': {time: null, split1: null, split2: null, split3: null}, 'GBA Bowser Castle 3': {time: null, split1: null, split2: null, split3: null},
                             "N64 DK's Jungle Parkway": {time: null, split1: null, split2: null, split3: null}, 'GCN Mario Circuit': {time: null, split1: null, split2: null, split3: null}},
                            Lightning: {'SNES Mario Circuit 3': {time: null, split1: null, split2: null, split3: null}, 'DS Peach Gardens': {time: null, split1: null, split2: null, split3: null}, 
                            'GCN DK Mountain': {time: null, split1: null, split2: null, split3: null}, "N64 Bowser's Castle": {time: null, split1: null, split2: null, split3: null}}};
        window.localStorage.setItem('trackList', JSON.stringify({list: this.trackList}));
    }


    //current adds a time to the object with list of playerTimes taking an object as input with certain fields filled in
    //addPlayerTime(input: {track: str, time: str, lap1: str, lap2: str, lap3: str}):
    addPlayerTime(input) {
        let found = false;
        for (let cup in this.trackList){
            if (input.track in this.trackList[cup]){
                found = true;
                if (this.checkValidFormat(input.time)){
                    this.trackList[cup][input.track].time = input.time;
                    this.trackList[cup][input.track].split1 = input.lap1;
                    this.trackList[cup][input.track].split2 = input.lap2;
                    this.trackList[cup][input.track].split3 = input.lap3;
                    window.localStorage.setItem('trackList', JSON.stringify({list: this.trackList}));
                }
                else {
                    alert('Please use a valid time format');
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
    //compareTimes(input: {track: string, time: string, lap1: string, lap2: string, lap3: string}): String
    compareTimes(input){
        for (let cup in this.trackList){
            if (input.track in this.trackList[cup]){
                if (this.trackList[cup][input.track].time === null){
                    return "Player does not have a completed time on this track";
                }
                let p1Time = this.convertStrToMS(this.trackList[cup][input.track].time);
                let p2Time = this.convertStrToMS(input.time);
                let timeDifference = p1Time - p2Time;
                let returnStr = ''
                if (timeDifference === 0){
                    document.getElementById('diffOutput').classList.value = 'neutralDifference';
                    return '0.000';
                }
                else if (timeDifference < 0){
                    returnStr += '-';
                    timeDifference *= -1;
                    document.getElementById('diffOutput').classList.value = 'fastDifference';
                }
                else {
                    returnStr += "+";
                    document.getElementById('diffOutput').classList.value = 'slowDifference';
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
        return 'Player does not have a completed time on this track';        
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
        let hexArr = inputArr.map(function(char){
            return char.charCodeAt(0);
        });
        function timeParser(bitArr) {
            let totalMinutes = bitArr[0] >> 1;
            let totalSeconds = ((bitArr[0] & 1) << 1) + (bitArr[1] >> 2);
            let totalMS = ((bitArr[1] & 3) << 8) + bitArr[2];
            return `${totalMinutes}` + ':' + `${totalSeconds}`.padStart(2, '0') + '.' + `${totalMS}`.padStart(3, '0');
        }
        let totalMinutes = hexArr[4] >> 1;
        let totalSeconds = ((hexArr[4] & 1) << 1) + (hexArr[5] >> 2);
        let totalMS = ((hexArr[5] & 3) << 8) + hexArr[6];
        document.getElementById('time').value = `${totalMinutes}` + ':' + `${totalSeconds}`.padStart(2, '0') + '.' + `${totalMS}`.padStart(3, '0');
        let track = ((hexArr[7] >> 2) & 63);
        document.getElementById('trackInput').value = this.trackIDObj[track];
        let l1 = timeParser(hexArr.slice(17, 20));
        let l2 = timeParser(hexArr.slice(20, 23));
        let l3 = timeParser(hexArr.slice(23, 26));
        document.getElementById('split1').value = l1;
        document.getElementById('split2').value = l2;
        document.getElementById('split3').value = l3;

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
            newCup.classList.add('normal-cursor');
            //newCup.classList.add('border');
            for (let track in this.trackList[cup]){
                let newTrack = document.createElement('div');
                newTrack.id = track;
                newTrack.classList.add('row');
                newTrack.classList.add('entry');
                //newTrack.classList.add('border');
                newCup.appendChild(newTrack);
                let trackName = document.createElement('div');
                trackName.classList.add('border');
                trackName.classList.add('col');
                trackName.classList.add('normal-cursor');
                trackName.classList.add('track-name');
                trackName.innerText = track;
                let time = document.createElement('div');
                time.classList.add('border');
                time.classList.add('col');
                time.classList.add('normal-cursor');
                time.classList.add('time-background');
                time.innerText = (this.trackList[cup][track].time ? 'Time: ' + this.trackList[cup][track].time + "\u00A0": '') + 
                (this.trackList[cup][track].split1 ? 'Lap 1: ' + this.trackList[cup][track].split1 + "\u00A0" : '') + 
                (this.trackList[cup][track].split2 ? 'Lap 2: ' + this.trackList[cup][track].split2 + "\u00A0": '') +
                (this.trackList[cup][track].split3 ? 'Lap 3: ' + this.trackList[cup][track].split3 : '');
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
