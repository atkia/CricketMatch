let body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    div5 = document.createElement('div'),
    div6 = document.createElement('div'),
    headingDiv = document.createElement('div'),
    BattingTeamName,BowlingTeamName;

function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/ScoreBoard.css";
    head.appendChild(link);
    return head;
}

function getBattingName(){
    let tossWonBy = localStorage.getItem('tossWonBy');

    if(tossWonBy == 'HostTeam'){
        BattingTeamName = localStorage.getItem('Host Name');
        BowlingTeamName = localStorage.getItem('Visitor Name');
    }
    else{
        BowlingTeamName = localStorage.getItem('Host Name');
        BattingTeamName = localStorage.getItem('Visitor Name');
    }

}

function createSpan(id,innerText){
    let span = document.createElement('span');

    span.id = id;
    span.innerText = innerText;
    div2.appendChild(span);
}

function createFirstRow(){
    let br = document.createElement('br');
    createSpan("teamName", BattingTeamName);
    createSpan("",',');
    createSpan('innings','1st inning');
    div2.appendChild(br);
    createSpan("runScore",'0');
    createSpan("scoreP","-");
    createSpan("wicket",'0');
}

function createTitle(){
    let h2 = document.createElement('h2');

    getBattingName();

    h2.innerText = BattingTeamName+" v/s "+BowlingTeamName;
    headingDiv.id = "title";
    headingDiv.appendChild(h2);
}

function createRow(){}

function createSecondRow(){
    let table = document.createElement('table');
    createRow();
    div3.appendChild(table);
}

function createThirdRow(){}

function createFourthRow(){}

function createFifthRow(){}

export function createBody(){
    body.innerHTML = '';
    addLink();
    div1.id = "center";
    div2.id = "firstRow";
    div3.id = "secondRow";
    div4.id = "thirdRow";
    div5.id = "fifthRow";
    div6.id = "fifthRow";
    createTitle();
    createFirstRow();
    div1.appendChild(headingDiv);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    div1.appendChild(div6);
    body.appendChild(div1);

    return body;
}
