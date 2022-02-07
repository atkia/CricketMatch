import * as elem from "./firstPage.js";
import * as players from "./SelectOpeningPlayer.js";
import * as scores from "./ScoreBoard.js";
import * as utils from './LocalStorageUtils.js';
import * as object from "./PlayerData.js";
import * as getTeam from './Teams.js';
import {history} from'./history.js';
let headingTitle = "Cricket Scorer",
    body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    headings = ['Teams','Toss By Won', 'Opted to?','Overs?'];
//let body = document.getElementsByTagName('body')[0];
 if(utils.getItem('gameId')===null){
  let game = new object.Games();
    console.log('got null!!!!!!!!!!')
     utils.setItem('gameId',game);
    console.log(utils.getItem('gameId'));
 }
function addLink(){
    let head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "./Stylesheets/Navbar.css";
    head.appendChild(link);
    return head
}
function createTitle(){
    let h1 = document.createElement('h1'),
        b = document.createElement('b'),
        br1 = document.createElement('br'),
        br2 = document.createElement('br'),title;
    // title = document.getElementById("firstRow");
    h1.id = 'fixedTitle';
    div2.appendChild(br1);
    div2.appendChild(h1);
    h1.appendChild(b);
    b.innerText = headingTitle;

    div2.appendChild(br2);
}

export function createMenuItems() {
    let menuItems = ['Menu','New Match', 'Teams', 'History'],
        ul = document.createElement('ul'),
        li2,li1,li3,li4,
        button = document.createElement('button'),
        button1 = document.createElement('button'),
        button2 = document.createElement('button'),
        button3 = document.createElement('button');

    //  div3.appendChild(ul);

    li1 = document.createElement('li');
    li2 = document.createElement('li');
    li3 = document.createElement('li');
    li4 = document.createElement('li');
    button.className ="active";
    li1.className="Disabled";
    button.id = 'menu';
    button.innerText="Menu";


    button1.id= "newMatch";
    button2.id = 'teams';
    button3.id = 'history';
    button1.innerText = menuItems[1];
    button1.onclick = function (){
        console.log("New Match button clicked")
        if(div2.style.display == 'none'){
            div2.style.display = 'block';
        }
        div4.innerHTML = '';
        div4.appendChild(elem.createForm());
        div4.appendChild(elem.createSubmitButton());
        indexPage();
    }
    button2.innerText = menuItems[2];
    button2.onclick = function (){
        console.log("teams button clicked")
        if(div2.style.display == 'none'){
            div2.style.display = 'block';
        }
        div4.innerHTML = '';
       let game = utils.getItem('gameId');
       div4.appendChild(getTeam.teamName(game));
    }
    button3.innerText = menuItems[3];
    button3.onclick = function (){
        if(div2.style.display == 'none'){
            div2.style.display = 'block';
        }

        div4.innerHTML = '';
        console.log("History button clicked")
        let game = utils.getItem('gameId');
        div4.appendChild(history(game));
        // let button1 = document.getElementById('resume');
        // button1.onclick=()=>{
        //     div3.style.display = 'block';
        //     console.log(match.matchIndex);
        //     //   scoreBoard.createBody(match.matchIndex);
        // }
    }
    li1.appendChild(button);
    li2.appendChild(button1);
    li3.appendChild(button2);
    li4.appendChild(button3);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    return ul;
}



export function indexPage(){
     console.log('3');
     let submitButton = document.getElementById("Submit");
     console.log(submitButton)
     submitButton.onclick = function (){
         div2.style.display = 'none';
         div3.style.display = 'none';
         elem.storeInputData();
         div4.innerHTML = '';
         div4.appendChild(players.createDivs());
         let submitButton = document.getElementById("startMatch");
         submitButton.onclick = function (){
            // div2.style.display = 'block';
             div3.style.display = 'block';
             elem.storeInputData();
            players.createObjects();
           //  body.innerHTML = '';
          //   createDivs();
             console.log('match Index:  '+players.matchIndex);
             div4.innerHTML = '';
             div4.appendChild(scores.createBody(players.matchIndex));

         }
     }

 }

function createDivs(){
     console.log('1')
  //  body.innerHTML = '';
    addLink();
    div1.className="center";
    div2.id = "fixedTitleDiv";
    div3.id="menuItems";
    div4.id = "form";
    createTitle();
    div3.appendChild(createMenuItems());
    div4.appendChild(elem.createForm());
    div4.appendChild(elem.createSubmitButton());

    body.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    return body;
}
createDivs();
indexPage();