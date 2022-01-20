function doForm(){
    var data = new FormData();

    var all = document.querySelectorAll("#user_form input");
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