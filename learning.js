// console.log("server file is running");
//                                     // method 1
// // function add(a,b){
// //     return a+b;
// // }

//                                     // method 2
// // var add = function(a,b){
// //     return a+b;
// // }


//                                     // method 3
// var add = (a,b) =>{
//     return a+b;
// }
// let res = add(9,1);
// console.log(res);







// fs se hmm file me kuch deta add krr skte hai file ke saath kuch operation krr skte hai 
// os se hmm apne system ka deta le skte hai
var fs = require('fs'); // file and forlder ke saath kaam krne ke liye use hota hai 
var os = require("os"); // system ke details ke liye kaam me aata hai 


fs.appendFile('greeting.txt',"hello \n", ()=>{console.log(' ')});
console.log(os.userInfo());
console.log(os.freemem());
console.log(os.totalmem())

fs.writeFileSync("greeting.txt", "hello Node.js");
const data = fs.readFileSync("greeting.txt",'utf-8');
console.log(data);



// console.log(os);
// console.log(fs);





function addNumber (a,b){
    return a+b;
}

let age = 30;
module.exports = {
    age,
    addNumber
}