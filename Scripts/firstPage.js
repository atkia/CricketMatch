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

 function createMenuItems() {
    let menuItems = ['New Match', 'Teams', 'History'],
        ul = document.createElement('ul'),
        li,li1,
        a,
        menuItemsLinks = ['./Scripts/NewMatch.js',' ',' '];

    div3.appendChild(ul);

    li1 = document.createElement('li');
    li1.className ="active";
    li1.innerText="Menu";

    ul.appendChild(li1);
    for (let i = 0; i < menuItems.length; i++) {
        li = document.createElement('li');
        a=document.createElement('a')
        a.href = menuItemsLinks[i];
        // a.className = "active";
        li.appendChild(a);
        a.innerText = menuItems[i];

        ul.appendChild(li);
    }
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
        h2.style = "color: darkgreen";
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
            label1 = createLabel("Bat","Host Team")
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
            // if( field.type!='button') {
            if (field.type == "radio") {
                if (field.checked) {
                    data.append(field.name, field.value);
                }
            } else {
                data.append(field.name, field.value);
            }
        }
        // }
    }
    for (let [k, v] of data.entries()) {
        localStorage.setItem(k,v);
        console.log(k, v); }
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
    createMenuItems();
    createForm();
    createSubmitButton();
    body.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    return body;
}
