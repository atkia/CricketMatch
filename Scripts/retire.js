import {createLabel,inputField} from './firstPage.js'
export function retire(battingTeamName,bowlingTeamName,strikerName,nonStrikerName){
    let div1 = document.createElement('div'),
        div2 = document.createElement('div'),
        form = document.createElement('form'),heading0 = document.createElement('span'),
        heading1 = document.createElement('h1'),
        heading2 = document.createElement('h1'),
        input1 ,
        label1,
        label2 ,
        input2,
        input3,
        input4 = document.createElement('input'),
        br = document.createElement('br'),
        img = document.createElement('img');
    img.src = 'https://pixabay.com/static/uploads/photo/2012/04/15/21/34/arrow-35386_960_720.png';
    img.id = 'backArrow';
    div1.id = 'retireTitle';
    div1.appendChild(img);
    heading0.innerText = battingTeamName+' v/s '+bowlingTeamName;
    heading0.id = 'heading';
    input4.type="button";
    input4.value="Done";
    input4.id='done';
    form.id = "retire_form";
    heading1.innerText = 'Select Player to retire';
    heading1.id = 'retirePlayerHeading';
    heading2.id = 'replaceByHeading';
    input1 = inputField("radio","retire1","retire");
    input1.value = strikerName;
    label1 = createLabel("retire1",strikerName);
    label1.id = 'retireL';

    form.appendChild(input1);
    form.appendChild(label1);
    input2 = inputField("radio","retire2","retire");
    input2.value = nonStrikerName;
    label2 = createLabel("retire2",nonStrikerName);
    label2.id = 'retireL';
    heading2.innerText = 'Replace by?';
    input3 = inputField("text","retireBy","replaceBy");
    div1.appendChild(heading0);
    form.appendChild(heading1);
    form.appendChild(input1);
    form.appendChild(label1);
    form.appendChild(br);
    form.appendChild(input2);
    form.appendChild(label2);
    form.appendChild(heading2);
    form.appendChild(input3);
    form.appendChild(input4);
    div2.appendChild(div1);
    div2.appendChild(form);
    return div2;
}