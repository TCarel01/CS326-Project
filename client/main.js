import { crudObj } from "./crud.js";
import { dataReader } from "./data reader.js";

const curReader = new dataReader(false);
const comparisonReader = new dataReader(true);
const crud = new crudObj(curReader);
const comparisonCrud = new crudObj(comparisonReader);

const submit = document.getElementById("submit-button");
const rivalSubmit = document.getElementById('rival-submit-button');
const selectMenu = document.getElementById("track");
const clear = document.getElementById('clear');
const personID = document.getElementById('personID');
const submitID = document.getElementById('createTimesheetButton');
const updateID = document.getElementById('updateTimesheetButton');
const readID = document.getElementById('readTimesheetButton');
const comparison = document.getElementById('comparison');
const compareButton = document.getElementById('compareButton');
const comparisonDisplay = document.getElementById('comparison-display');

curReader.render(document.getElementById('track-display'), {});


submit.addEventListener("click", function(event){
    let trackName = document.getElementById("trackInput").value;
    let time = document.getElementById("time").value;
    let lap1 = document.getElementById('split1').value === "" ? undefined : document.getElementById('split1').value;
    let lap2 = document.getElementById('split2').value === "" ? undefined : document.getElementById('split2').value;
    let lap3 = document.getElementById('split3').value === "" ? undefined : document.getElementById('split3').value;
    curReader.addPlayerTime({track: trackName, time: time, lap1: lap1, lap2: lap2, lap3: lap3});
    curReader.render(document.getElementById('track-display'), {});
});

submitID.addEventListener('click', async function(event) {
    let idVal = personID.value;
    await crud.saveTimeSheet(idVal);
});

updateID.addEventListener('click', async function(event) {
    let idVal = personID.value;
    await crud.updateTimeSheet(idVal);
});

readID.addEventListener('click', async function(event) {
    let idVal = personID.value;
    let timesheetJSON = await crud.readTimeSheet(idVal);
    if ('timesheet' in timesheetJSON){
        curReader.trackList = JSON.parse(timesheetJSON.timesheet);
        curReader.render(document.getElementById('track-display'), {});
    }
});

compareButton.addEventListener('click', async function(event) {
    let curComparison = comparison.value;
    if (curComparison === 'Standards') {
        await comparisonCrud.getStandards();
        comparisonReader.render(comparisonDisplay, curReader.trackList);
    }
    else if (curComparison === 'World Records') {
        await comparisonCrud.getWRTimes();
        comparisonReader.render(comparisonDisplay, curReader.trackList);
    }
});

// rivalSubmit.addEventListener('click', function(event) {
//     let trackName = document.getElementById('rivalTrackInput').value;
//     let time = document.getElementById('rivalTime').value;
//     let lap1 = document.getElementById('rivalSplit1').value;
//     let lap2 = document.getElementById('rivalSplit2').value;
//     let lap3 = document.getElementById('rivalSplit3').value;
//     let difference = curReader.compareTimes({track: trackName, time: time, lap1: lap1, lap2: lap2, lap3: lap3});
//     document.getElementById('diffOutput').value = difference;
// });


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

const rivalFile = document.getElementById('rivalGhost');

file.addEventListener('change', function(event){
    console.log(file.files);
    const reader = new FileReader();
    reader.onload = function () {
        curReader.parseRKG(reader.result, 'player');
    }
    reader.readAsBinaryString(file.files[0]);
});

rivalFile.addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function () {
        curReader.parseRKG(reader.result, 'rival');
    }
    reader.readAsBinaryString(rivalFile.files[0]);
});

clear.addEventListener('click', function(event) {
    curReader.clear();
    curReader.render(document.getElementById('track-display'), {});
});
