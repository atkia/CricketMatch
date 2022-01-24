let headingTitle = "Select Opening Players",
    titleOfInputFields = ["Striker","Non Striker","Bowler"],
    body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    form = document.createElement('form');

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/OpeningPlayerName.css";
    head.appendChild(link);
}

function inputField(id,name){
    let input = document.createElement('input');
    input.id = id;
    input.name = name;
    return input;
}

function createTitle(){
    let h2 = document.createElement('h2');
    h2.innerText = headingTitle;
    h2.id = "heading"
    div2.id = "title";
    div2.appendChild(h2);
}

function createInputFields(){
    for(let heading of titleOfInputFields){
        let h2 = document.createElement('h2');
        h2.innerText = heading;
        let input = document.createElement('input');
        input = inputField("f1",heading);
        input.type = "text";
        input.placeholder = "Player Name";
        form.appendChild(h2);
        form.appendChild(input);
    }
}

function createSubmitButton(){
    let input = document.createElement('input');

    input.type="button";
    input.value="Start match";
    input.className="centerSubmit";
    input.id='Submit';
    div3.appendChild(input);
}

export function createDivs(){
    body.innerHTML = '';
    console.log("createdDivs");
    div1.className = "center";
    addLink();
    form.id = "player_form";
    createTitle();
    createInputFields();

    div1.appendChild(div2);
    div1.appendChild(div3);
    div3.appendChild(form);
    createSubmitButton();
    body.appendChild(div1);
    return body;
}




