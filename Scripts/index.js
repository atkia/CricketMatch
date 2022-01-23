console.log("Atkia....");
function addLink(){
 let head = document.getElementsByTagName('head')[0],
     link = document.createElement('link');

 link.rel = 'stylesheet';
 link.href = "./Stylesheets/Navbar.css";
 // head.appendChild(link);
    head.appendChild(link)
}
addLink();
import * as elem from "./firstPage.js";
let h1 = document.createElement('h1'),
    b = document.createElement('b'),
br = document.createElement('br'),title;
title = document.getElementById("firstRow");
    title.appendChild(h1);
h1.appendChild(b);
b.innerText = elem.title;
title.appendChild(br);
title.appendChild(br);
elem.createMenuItems();

elem.createForm();

document.getElementById("form").appendChild(elem.createSubmitButton(''));

let submitButton = document.getElementById("Submit");
submitButton.onclick = function (){
    elem.storeInputData();
}

