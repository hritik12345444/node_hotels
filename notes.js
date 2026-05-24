
console.log("Notes is started");   // phle ye chalega 
var serv = require('./server.js') // server.js ko import kiye isss file me  // 2nd me ye chalega
console.log("Notes are completed"); // 3rd me ye chalega 


console.log(serv.age);  // ye dusre file ka data hai usss file me jabb takk exports nhi krenge tbb tkk isme ussko use nahi krr skte hai 
// for testing 
console.log(serv.addNumber(serv.age,18));
