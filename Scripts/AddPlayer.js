let input= document.createElement('input'),h2 = document.createElement('h2'),
    div = document.createElement('div'),
    body = document.getElementsByTagName('body')[0];
   // export let newBatsman;
import {createBody} from './ScoreBoard.js'
import {storeInputData} from './firstPage.js'
function createSubmitButton() {
    let input = document.createElement('input');

    input.type = "button";
    input.value = "Enter";
    input.className = "PlayerEntry";
    input.id = 'Submit';
    input.onclick = ()=>{

        console.log("1....");
      //  body.innerHTML='';
        createBody();
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
    storeInputData();
  // newBatsman = input.value;
   // console.log("new Batsman Name: "+newBatsman);

    div.id = 'center';
    div.innerHTML = '';
    div.appendChild(h2);
    div.appendChild(input);
    div.appendChild(button);
    body.innerHTML='';
    body.appendChild(div);
}