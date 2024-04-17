const http = require("http");
const dateTime = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const PORT = process.env.PORT || 3000;
const path = require("path");
const EventEmitter = require('events')
const logEvents = require('./logEvents')

const myEmitter = new EventEmitter();
myEmitter.on('log' , (msg,fileName) =>{
  logEvents(msg , fileName)
})

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFie(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      contentType: contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.error(error);
  myEmitter.emit('log' , `${error.name}\t${error.message}` , 'errLog.txt')

    // res.statusCode = 500;
    // res.end(data);
  }
};

const server = http.createServer((req, res) => {

  const {url, method} = req;
  console.log(url , method)
  myEmitter.emit('log' , `${url}\t${method}` , 'reqLog.txt');

  const extension = path.extname(url)
  console.log(extension)
  // // console.log(JSON.stringify(!extension))
  // let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && url.slice(-1) === "/"
      ? path.join(__dirname, "views", url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", url)
      : path.join(__dirname, url);

  if (!extension && url.slice(-1) !== "/") filePath += ".html";
  console.log(filePath);
  console.log(path.parse(filePath));

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    console.log(path.parse(filePath));
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
