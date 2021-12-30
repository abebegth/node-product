const fs = require('fs');
const http = require('http');

///////////////// FILES ////////////////

// // Synchronous way, Blocking
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// // Asynchronous, Non-blocking
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) =>{
//             console.log(data3)
            
//             fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err =>{
//                 console.log("Your file has been written.")
//             })
//         });
//     });
// });
// console.log("Reading FIle...");


////////////////////// SERVER ///////////////

const server = http.createServer((req, res) =>{
    console.log(req);
    res.end('Hello from the server!');

});
server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening to requests on http://127.0.0.1:8000');
});