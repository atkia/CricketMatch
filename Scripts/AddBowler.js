let div = document.createElement('div');
import {storeInputData} from './firstPage.js';
function createTitle(){
    console.log('b')
    let div1 = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.id = 'chooseBowler';
    h1.innerText = 'Choose Bowler';
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
    input1.name = 'newBowlerName';
    input1.placeholder = 'name';
    label.id = 'newBowlerLabel'
    label.htmlFor = 'newBowlerName';
    label.innerText = 'Select a new bowler';
    input2.id = 'addBowlerButton';
    input2.type = 'button';
    input2.value = 'Done';
    div.appendChild(label);
    div.appendChild(input1);
    div.appendChild(input2);

}
export function addBowlerDiv(){
    div.innerHTML = '';
    console.log('a');
    createTitle();
    inputField();
    div.id = 'addBowlerDiv';
    console.log(div)
    return div;
}