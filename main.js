import { dataReader } from "./data reader.js";

const curReader = new dataReader();


const submit = document.getElementById("submit-button");
const rivalSubmit = document.getElementById('rival-submit-button');
const selectMenu = document.getElementById("track");
const clear = document.getElementById('clear');
curReader.render(document.getElementById('track-display'));


submit.addEventListener("click", function(event){
    let trackName = document.getElementById("trackInput").value;
    let time = document.getElementById("time").value;
    let lap1 = document.getElementById('split1').value === "" ? undefined : document.getElementById('split1').value;
    let lap2 = document.getElementById('split2').value === "" ? undefined : document.getElementById('split2').value;
    let lap3 = document.getElementById('split3').value === "" ? undefined : document.getElementById('split3').value;
    curReader.insertTrack(trackName);
    curReader.addPlayerTime({track: trackName, time: time, lap1: lap1, lap2: lap2, lap3: lap3});
    if (selectMenu.value === trackName){
        changeDiff();
    }
    curReader.render(document.getElementById('track-display'));
});

rivalSubmit.addEventListener('click', function(event) {
    let trackName = document.getElementById('rivalTrackInput').value;
    let time = document.getElementById('rivalTime').value;
    let lap1 = document.getElementById('rivalSplit1').value;
    let lap2 = document.getElementById('rivalSplit2').value;
    let lap3 = document.getElementById('rivalSplit3').value;
    let difference = curReader.compareTimes({track: trackName, time: time, lap1: lap1, lap2: lap2, lap3: lap3});
    document.getElementById('diffOutput').value = difference;
});

selectMenu.addEventListener("change", changeDiff);

function changeDiff() {
    if (selectMenu.value === "---"){
        return;
    }
    let diffOutput = document.getElementById("diffOutput");
    let difference = curReader.compareTimes(selectMenu.value, "time");
    diffOutput.value = difference;
    if (difference.charAt(0) === '-'){
        diffOutput.style.color = 'green';
    }
    else if (difference.charAt(0) === "+"){
        diffOutput.style.color = 'red';
    }
}

const file = document.getElementById('file');

file.addEventListener('change', function(event){
    console.log(file.files);
    const reader = new FileReader();
    reader.onload = function () {
        curReader.parseRKG(reader.result);
    }
    reader.readAsBinaryString(file.files[0]);
});

clear.addEventListener('click', function(event) {
    curReader.clear();
    curReader.render(document.getElementById('track-display'));
});
