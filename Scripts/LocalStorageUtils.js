export function setItem(key,value){
    let jsonValue = JSON.stringify(value);
    localStorage.setItem(key,jsonValue);
}

export function getItem(key){
    let value = JSON.parse( localStorage.getItem(key));
    return value;
}