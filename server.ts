import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

// You can choose port via command line. e.g. node server.js 3000
const port = process.argv[2] || 1234;
const folderToSave = 'app';
const extensions = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ttf': 'application/font-sfnt'
}

// Each triplet is the URL prefix, a folder to serve, and the default filename to use when a folder is resolved.
// Longest prefixes first!
const routes = [['/node_modules/', 'node_modules', 'index.js'], ['/', 'app', 'index.html']]

http.createServer((req, res) => {
    console.log(req.method, req.url);

    const parsedUrl = url.parse(req.url!);
    // Figure out which of the routes applies to the requested URL
    const route = routes.filter(r => r[0] == parsedUrl.pathname?.substring(0, r[0].length))[0];

    //Figure out the path of the file in the real file system
    let filepath = route[1] + '/' + parsedUrl.pathname?.substring(route[0].length);

    // Check whether the file exists and whether it is actually folder
    fs.stat(filepath, (err, fileinfo) => {
        if(err) {
            res.statusCode = 404;
            res.end('Error: ' + err.message);
        } else {
            if(fileinfo.isDirectory())
                filepath += '/' + route[2];
            
            // Read the file and send it to the user's web browser
            fs.readFile(filepath, (err, data) => {
                if(err) {
                    res.statusCode = 404;
                    res.end('Read Error: ' + err.message);
                } else {
                    let ext = path.extname(filepath);
                    // const mimeType = extensions[ext] || 'application/octet-stream';
                    // res.writeHead(200, { 'Content-Type': mimeType });
                    res.end(data);
                }
            })
        }
    })

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(`<html><body>You asked for ${req.url}</body></html>`);
}).listen(1234);