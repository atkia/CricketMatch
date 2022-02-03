let headingTitle = "Cricket Scorer",
    body = document.getElementsByTagName('body')[0],
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    headings = ['Teams','Toss By Won', 'Opted to?','Overs?'];

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
     button2.innerText = menuItems[2];
     button3.innerText = menuItems[3];
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

 function inputField(type,id,name){
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;

    return input;
}

 function createLabel(forL,text){
    let label = document.createElement('label');
    label.for = forL;
    // label.innerText = localStorage.getItem("Host Name")
    label.innerText = text;

    return label;

}

 function createForm(){
    let  form = document.createElement('form'),h2,
        input1 = document.createElement('input'),
        label1 = document.createElement('label') ,
        label2 = document.createElement('label') ,
        input2 = document.createElement('input');
    form.id = "user_form";

    for(let heading of headings){
        h2 = document.createElement('h2');
        h2.innerText=heading;

        form.appendChild(h2);
        if(heading == "Teams") {
            input1 = inputField("text", "t1Name", "Host Name");
            input1.placeholder = "hostTName";
            form.appendChild(input1);
            input2 = inputField("text", "t2Name", "Visitor Name" );
            input2.placeholder = "visitorTName";
            form.appendChild(input2)
            // storeInputData();

            // localStorage.setItem()
        }

        if(heading =="Toss By Won"){
            input1 = inputField("radio","hT","tossWonBy");
            input1.value = "HostTeam";
            label1 = createLabel("hT","Host Team")
            form.appendChild(input1);
            form.appendChild(label1);
            input2 = inputField("radio","vT","tossWonBy");
            input2.value = "VisitorTeam";
            label2 = createLabel("vT","Visitor Team");
            form.appendChild(input2);
            form.appendChild(label2);

        }

        if(heading =="Opted to?"){
            input1 = inputField("radio","Bat","optTo");
            input1.value = "Bat";
            label1 = createLabel("Bat","Bat")
            form.appendChild(input1);
            form.appendChild(label1);
            input2 = inputField("radio","Ball","optTo");
            input2.value = "Ball";
            label2 = createLabel("Ball","Ball");
            form.appendChild(input2);
            form.appendChild(label2);

        }

        if(heading == "Overs?") {
            input1 = inputField("text", "over", "over");
            input1.placeholder = "16";
            form.appendChild(input1);
        }

    }

    div4.appendChild(form);
}

 function createSubmitButton(){
    // let a = document.createElement('a'),
    let input = document.createElement('input');

    // a.href = link;
    input.type="button";
    input.value="Start match";
    input.className="centerSubmit";
    input.id='Submit';
    // a.appendChild(input);
    div4.appendChild(input);
}

 export function storeInputData(){
    console.log("Stored...")
    let data = new FormData();

    let all = document.querySelectorAll("input");
    for(let field of all){
        if (field.type != "submit" && field.type!='button') {
            if (field.type == "radio") {
                if (field.checked) {
                    data.append(field.name, field.value);
                }
            } else {
                data.append(field.name, field.value);
            }
        }
    }
    for (let [k, v] of data.entries()) {
        localStorage.setItem(k,v);
        // console.log(k, v);
    }
    return false;

}

 export function createDivs(){
     body.innerHTML = '';
     addLink();
    div1.className="center";
    div2.id = "firstRow";
    div3.id="menuItems";
    div4.id = "form";

    // createDivs();
    createTitle();
    div3.appendChild(createMenuItems());
    createForm();
    createSubmitButton();
    body.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    return body;
}
