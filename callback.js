const firstName = "Mohammad";
const lastName = "Rezania";
function name(first , last , concate){
    return concate(first , last);
}
function add(x , y){
    return x + " " + y;
}
console.log(name(firstName , lastName , add));
