// let input= document.createElement('input'),h2 = document.createElement('h2'),
//     div = document.createElement('div'),
//     body = document.getElementsByTagName('body')[0];
//    // export let newBatsman;
// import {changePLayer, createBattingPLayerTable, createBody, createBowlerTable,matchIndex} from './ScoreBoard.js'
// import {storeInputData} from './firstPage.js'
// function createSubmitButton() {
//     console.log("create button function called...")
//     let input = document.createElement('input');
//
//     input.type = "button";
//     input.value = "Enter";
//     input.className = "PlayerEntry";
//     input.id = 'Submit';
//     input.onclick = ()=>{
//         storeInputData();
//
//         console.log("1....");
//         changePLayer();
//         createBody(matchIndex);
//         createBattingPLayerTable();
//         createBowlerTable();
//     }
//     return input;
// }
//
// export function createInputField(){
//     console.log('New page.....')
//     h2.innerText = "New Batsman Name:";
//     input.id = 'newBatsman';
//     input.type = "text";
//     input.name = "NewPlayerName";
//
//     let button = createSubmitButton();
//
//
//     div.id = 'center';
//     div.innerHTML = '';
//     div.appendChild(h2);
//     div.appendChild(input);
//     div.appendChild(button);
//     body.innerHTML='';
//     body.appendChild(div);
// }

let div = document.createElement('div');
function createTitle(){
    console.log('b')
    let div1 = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.id = 'chooseBowler';
    h1.innerText = 'Fall of wicket';
    div1.id = 'chooseBowlerDiv';
    div1.appendChild(h1);
    div.appendChild(div1);
}
function inputField(){
    console.log('c')
    let label = document.createElement('label'),
        input1 = document.createElement('input'),
        input2 = document.createElement('input');

    input1.type = 'text';
    input1.id = 'newBowlerName';
    input1.name = 'newBatsmanName';
    input1.placeholder = 'name';
    label.id = 'newBowlerLabel'
    label.htmlFor = 'newBowlerName';
    label.innerText = 'New Batsman Name';
    input2.id = 'addBatsmanButton';
    input2.type = 'button';
    input2.value = 'Enter';
    div.appendChild(label);
    div.appendChild(input1);
    div.appendChild(input2);

}
export function addBatsManDiv(){
    div.innerHTML = '';
    createTitle();
    inputField();
    div.id = 'addBatsManDiv';
    console.log(div)
    return div;
}