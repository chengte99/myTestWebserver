var http = require("http");
var https = require("https");
const querystring = require('querystring');

/*
	[100] = "Continue",
		[101] = "Switching Protocols",
		[200] = "OK",
		[201] = "Created",
		[202] = "Accepted",
		[203] = "Non-Authoritative Information",
		[204] = "No Content",
		[205] = "Reset Content",
		[206] = "Partial Content",
		[300] = "Multiple Choices",
		[301] = "Moved Permanently",
		[302] = "Found",
		[303] = "See Other",
		[304] = "Not Modified",
		[305] = "Use Proxy",
		[307] = "Temporary Redirect",
		[400] = "Bad Request",
		[401] = "Unauthorized",
		[402] = "Payment Required",
		[403] = "Forbidden",
		[404] = "Not Found",
		[405] = "Method Not Allowed",
		[406] = "Not Acceptable",
		[407] = "Proxy Authentication Required",
		[408] = "Request Time-out",
		[409] = "Conflict",
		[410] = "Gone",
		[411] = "Length Required",
		[412] = "Precondition Failed",
		[413] = "Request Entity Too Large",
		[414] = "Request-URI Too Large",
		[415] = "Unsupported Media Type",
		[416] = "Requested range not satisfiable",
		[417] = "Expectation Failed",
		[500] = "Internal Server Error",
		[501] = "Not Implemented",
		[502] = "Bad Gateway",
		[503] = "Service Unavailable",
		[504] = "Gateway Time-out",
		[505] = "HTTP Version not supported",
}
*/
/*
callback(is_success, data/erro)
*/
// get请求的参数，是带在URL的地址上面的
function http_get(ip, port, url, params, callback) {
	// step1,创建一个 http.ClientRequest
	var options = {
		host: "127.0.0.1",
		port: port,
		path: url + "?" + params,
		method: "GET"
	};

	// 当有请求返回的时候，参数就会被传递为http.IncomingMessage
	var req = http.request(options, function(incoming_msg) {
		console.log("respones status " + incoming_msg.statusCode);

		// 监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
		incoming_msg.on("data", function(data) {
			if (incoming_msg.statusCode === 200) {
				callback(true, data);
			}
		});
		 
	});

	// 把这个请求发送出去
	req.end();
}

/*
http_get("127.0.0.1", 6080, "/login", "uname=blake&upwd=123456", function(is_ok, data) {
	if (is_ok) {
		console.log(data.toString());
	}
});
*/

// post可以带body数据传到服务器
function http_post(hostname, port, url, params, body, contentType, callback) {
	// step1,创建一个 http.ClientRequest
	var options = {
		hostname: hostname,
		// host: ip,
		port: port,
		// path: url + "?" + params,
		path: url,
		method: "POST",

		headers: {
			// "Content-Type": "application/x-www-form-urlencoded",
			// "Content-Type": "application/json",
			"Content-Type": contentType,
			"Content-Length": body.length
		}
	};

	var req = http.request(options, function(incoming_msg) {
		console.log("respones status " + incoming_msg.statusCode);

		// 监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
		incoming_msg.on("data", function(data) {
			if (incoming_msg.statusCode === 200) {
				callback(true, data);
			}
		});
		 
	});

	// step2 写入body数据
	req.write(body);

	// 发送请求
	req.end();
}


function https_post(hostname, port, url, params, body, contentType, callback) {
	// step1,创建一个 http.ClientRequest
	var options = {
		hostname: hostname,
		// host: ip,
		port: port,
		// path: url + "?" + params,
		path: url,
		method: "POST",

		headers: {
			"Content-Type": contentType,
			"Content-Length": body.length
		}
	};

	var req = https.request(options, function(incoming_msg) {
		console.log("respones status " + incoming_msg.statusCode);

		// 监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
		incoming_msg.on("data", function(data) {
			if (incoming_msg.statusCode === 200) {
				callback(true, data);
			}
		});
		 
	});

	// step2 写入body数据
	req.write(body);

	// 发送请求
	req.end();
}

function encodeFormData(data) {
	if (!data) return "";    // Always return a string
	var pairs = [];          // To hold name=value pairs
	for (var name in data) {                                  // For each name
		if (!data.hasOwnProperty(name)) continue;            // Skip inherited
		if (typeof data[name] === "function") continue;      // Skip methods
		var value = data[name].toString();                   // Value as string
		name = encodeURIComponent(name.replace("", ""));   // Encode name
		value = encodeURIComponent(value.replace("", "")); // Encode value
		pairs.push(name + "=" + value);   // Remember name=value pair
	}
	return pairs.join('&'); // Return joined pairs separated with &
}

// http_post("127.0.0.1", 6080, "/book", "filename=my_file.txt", "Hello Htpp Post", function(is_ok, data) {
// 	if (is_ok) {
// 		console.log("upload_success", data.toString());	
// 	}
// });

// const postData = querystring.stringify({
// 	"CrlMode": "appctl",
// 	"App": "bf",
// 	"IsDev": 0
// });

// http_post("ctl.5282288.net", 80, "/appmenu_api/listApm.php", null, postData, function(is_ok, data) {
// 	if (is_ok) {
// 		console.log("json = \n", JSON.parse(data));
// 	}
// });

var body = {
    AppName: "迪拜皇宮 app123",
    URL: "http://localhost:3002/app/zh_CN/customer_service_download_app",
    PayloadDescription: "迪拜皇宮app123",
    PayloadDisplayName: "迪拜皇宮app123",
    PayloadOrganization: "迪拜皇宮app123",
    AppIcon: "https://i.imgur.com/pHMSCkd.png"
}

// var body = {
//     AppName: "APP一般版 123",
//     URL: "http://google.com/",
//     PayloadDescription: "APP一般版 123",
//     PayloadDisplayName: "APP一般版 123",
//     PayloadOrganization: "APP一般版 123",
//     AppIcon: "https://i.imgur.com/pHMSCkd.png"
// }

let contentType = "application/x-www-form-urlencoded";
// let contentType = "application/json";
let post_data = null;
if(contentType === "application/x-www-form-urlencoded") {
	post_data = encodeFormData(body);
}else {
	post_data = JSON.stringify(body);
}
console.log(post_data)

https_post("appctl.66fbapp.com", 
	443, 
	"/app_log/api_webclipConfiguration.php", 
	null, 
	post_data, 
	contentType, 
	function(is_ok, data){
		if(is_ok){
			// console.log("upload_success", JSON.parse(data));
			console.log(data.toString())
		}else {

		}
	}
)