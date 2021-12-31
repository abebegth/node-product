const fs = require('fs');
const http = require('http');
const url = require('url');

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

// this functions will be executed only once (synchronously) when the application starts, then the data read from this function 
//can be used as many as we want without calling this function..... read once use multiple times in other functions
const data = fs.readFileSync(`${__dirname}/json-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) =>{
    // console.log(req.url);
    const pathName = req.url;
    if(pathName === '/' || pathName === '/home'){
        res.end('This is the HOME page!');
    }
    else if(pathName === '/product'){
        res.end('This is the PRODUCT page!');
    }
    else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }

});
server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening to requests on http://127.0.0.1:8000');
});