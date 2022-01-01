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

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
    
}
// this functions will be executed only once (synchronously) when the application starts, then the data read from this function 
//can be used as many as we want without calling this function..... read once use multiple times in other functions
const tempIndex = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/json-data/data.json`, 'utf-8');

const dataObject = JSON.parse(data);

const server = http.createServer((req, res) =>{
    // console.log(req.url);
    const pathName = req.url;

    // Home page
    if(pathName === '/' || pathName === '/home'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const index = tempIndex.replace('{%PRODUCT_CARDS%}', cardsHtml)
        // console.log(cardsHtml)
        res.end(index);
    }
    
    // Products page
    else if(pathName === '/product'){
        res.end('This is the PRODUCT page!');
    }

    // API page
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