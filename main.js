import { dataReader } from "./data reader.js";

const curReader = new dataReader();


const submit = document.getElementById("submit-button");
const selectMenu = document.getElementById("track");

submit.addEventListener("click", function(event){
    let trackName = document.getElementById("trackInput").value;
    let time = document.getElementById("time").value;
    let player = document.getElementById("player").value === "Player 1" ? 1 : 2;
    curReader.insertTrack(trackName);
    curReader.addPlayerTime(player, {track: trackName, time: time});
    if (selectMenu.value === trackName){
        changeDiff();
    }
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
