let input= document.createElement('input'),h2 = document.createElement('h2'),
    div = document.createElement('div'),
    body = document.getElementsByTagName('body')[0];
   // export let newBatsman;
import {changePLayer, createBattingPLayerTable, createBody, createBowlerTable} from './ScoreBoard.js'
import {storeInputData} from './firstPage.js'
function createSubmitButton() {
    console.log("create button function called...")
    let input = document.createElement('input');

    input.type = "button";
    input.value = "Enter";
    input.className = "PlayerEntry";
    input.id = 'Submit';
    input.onclick = ()=>{
        storeInputData();

        console.log("1....");
        changePLayer();
        createBody();
        createBattingPLayerTable();
        createBowlerTable();
    }
    return input;
}

export function createInputField(){
    console.log('New page.....')
    h2.innerText = "New Batsman Name:";
    input.id = 'newBatsman';
    input.type = "text";
    input.name = "NewPlayerName";

    let button = createSubmitButton();


    div.id = 'center';
    div.innerHTML = '';
    div.appendChild(h2);
    div.appendChild(input);
    div.appendChild(button);
    body.innerHTML='';
    body.appendChild(div);
}