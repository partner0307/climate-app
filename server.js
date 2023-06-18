(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "http", "fs", "url", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var http = require("http");
    var fs = require("fs");
    var url = require("url");
    var path = require("path");
    // You can choose port via command line. e.g. node server.js 3000
    var port = process.argv[2] || 1234;
    var folderToSave = 'app';
    var extensions = {
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
    };
    // Each triplet is the URL prefix, a folder to serve, and the default filename to use when a folder is resolved.
    // Longest prefixes first!
    var routes = [['/node_modules/', 'node_modules', 'index.js'], ['/', 'app', 'index.html']];
    http.createServer(function (req, res) {
        var _a;
        console.log(req.method, req.url);
        var parsedUrl = url.parse(req.url);
        // Figure out which of the routes applies to the requested URL
        var route = routes.filter(function (r) { var _a; return r[0] == ((_a = parsedUrl.pathname) === null || _a === void 0 ? void 0 : _a.substring(0, r[0].length)); })[0];
        //Figure out the path of the file in the real file system
        var filepath = route[1] + '/' + ((_a = parsedUrl.pathname) === null || _a === void 0 ? void 0 : _a.substring(route[0].length));
        // Check whether the file exists and whether it is actually folder
        fs.stat(filepath, function (err, fileinfo) {
            if (err) {
                res.statusCode = 404;
                res.end('Error: ' + err.message);
            }
            else {
                if (fileinfo.isDirectory())
                    filepath += '/' + route[2];
                // Read the file and send it to the user's web browser
                fs.readFile(filepath, function (err, data) {
                    if (err) {
                        res.statusCode = 404;
                        res.end('Read Error: ' + err.message);
                    }
                    else {
                        var ext = path.extname(filepath);
                        // const mimeType = extensions[ext] || 'application/octet-stream';
                        // res.writeHead(200, { 'Content-Type': mimeType });
                        res.end(data);
                    }
                });
            }
        });
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end("<html><body>You asked for ".concat(req.url, "</body></html>"));
    }).listen(1234);
});
//# sourceMappingURL=server.js.map