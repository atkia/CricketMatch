import * as elem from "./firstPage.js";
import * as players from "./SelectOpeningPlayer.js";
import * as scores from "./ScoreBoard.js";

elem.createDivs();
let submitButton = document.getElementById("Submit");
submitButton.onclick = function (){
    elem.storeInputData();
    players.createDivs();
    let submitButton = document.getElementById("Submit");
    submitButton.onclick = function (){
        elem.storeInputData();
        players.createObjects();
         scores.createBody();

    }
}

