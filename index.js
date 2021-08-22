const fs = require('fs');
const http = require('http');
const replaceElements = require('./modules/replaceElements');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataR = JSON.parse(data);

const cardTemp = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8');
const overviewTemp = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8');

const server = http.createServer((req, res) => {
    const { pathname, query } = require('url').parse(req.url, true);
    if (pathname === '/overview' || pathname === '/') {  // preview
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cards = dataR.map(el => replaceElements(cardTemp, el)).join(' ');
        res.end(overviewTemp.replace(`{%CARDS%}`, cards));


    } else if (pathname === '/api') { //API
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);


    } else if (pathname === `/product`) { //Product
        const product = dataR[query.id];
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(replaceElements(productTemp, product));

    } else {  //ERROR
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }

    console.log(`Heard One from ${pathname}`);
});

server.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log(`Listening....`);
});