var arr= [1,2,4,5,6,7,8,9,10];
var dobro = arr.map(element => { 
    return element*2;
});
console.log(dobro)

let parNumber = arr.filter(element => {
    if(element%2==0)
        return element;
});
console.log(parNumber);
