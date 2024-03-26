var express = require("express");
var path = require("path");

var apps = require("./apps")
var server_config = require("../server_config");

var http = require("http");

var app = express();


var staticFilePath = path.join(process.cwd() + "/www_root/static");
app.use("/static", express.static(staticFilePath));
app.use("/", apps);

var httpServer = http.createServer(app);

var http_config = server_config.webserver.http_config;

httpServer.listen(http_config.port, function(){
    console.log("HTTP server is running on: http://127.0.0.1:", http_config.port);
})