import * as elem from "./firstPage.js";
import * as players from "./SelectOpeningPlayer.js";
import * as scores from "./ScoreBoard.js";
import * as utils from './LocalStorageUtils.js';
import * as object from "./PlayerData.js";
 if(utils.getItem('gameId')===null){
  let game = new object.Games();
    console.log('got null!!!!!!!!!!')
     utils.setItem('gameId',game);
    console.log(utils.getItem('gameId'));
 }
// import{addExtras} from './Extras.js';
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

