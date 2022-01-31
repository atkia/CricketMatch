import * as elem from "./firstPage.js";
import * as players from "./SelectOpeningPlayer.js";
import * as scores from "./ScoreBoard.js";
import * as utils from './LocalStorageUtils.js';
 // if(utils.getItem('MatchNo')===null){
 //    // console.log('got null!!!!!!!!!!')
 //     utils.setItem('MatchNo',0);
 // }
 // else{
 //     let matchNo = utils.getItem('MatchNo')+1;
 //     utils.setItem('MatchNo',matchNo);
 // }
 //

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

