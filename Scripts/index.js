import * as elem from "./firstPage.js";
import * as players from "./SelectOpeningPlayer.js";
import * as scores from "./ScoreBoard.js";
import * as utils from './LocalStorageUtils.js';
import * as object from "./PlayerData.js";
import * as getTeam from './Teams.js';
import {history} from'./history.js';
let body = document.getElementsByTagName('body')[0];
 if(utils.getItem('gameId')===null){
  let game = new object.Games();
    console.log('got null!!!!!!!!!!')
     utils.setItem('gameId',game);
    console.log(utils.getItem('gameId'));
 }

 function indexPage(){
     elem.createDivs();
     let historyButton = document.getElementById('history');
     historyButton.onclick = function (){
         console.log("buton clicked")
         let game = utils.getItem('gameId');
         history(game);
     }

     let teamButton = document.getElementById('teams');
     teamButton.onclick = function (){
         //  console.log('teams....');
         let game = utils.getItem('gameId');
         getTeam.teamName(game);
     }

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

 }
 indexPage();
// import{addExtras} from './Extras.js';

