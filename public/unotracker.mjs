// The (local) server
const PORT = 8080;
const DOMAIN = "127.0.0.1";

// How a (remote) client will connect to us
const URL = "http://localhost:8080";

import { createServer } from "node:http";
import * as fs from "fs";
import * as path from "path";

const server = createServer((request, response) => {
  console.log("Request for " + request.url + " by method " + request.method);

  if (request.url.toLowerCase().startsWith("/api")) {
    response.writeHead(200, { "Content-Type": "text/json" });
    response.end('{"error":"Not yet supported"}');
    return;
  }

  if (fs.existsSync("." + request.url)) {
    response.writeHead(200, { "Content-Type": "text/html" });
    var fileHTML = fs.readFileSync("." + request.url, "utf8");
    fileHTML = fileHTML.replace("{{ url }}", URL);
    response.end(fileHTML);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end(request.url + " not found.");
});

server.listen(PORT, DOMAIN, () => {
  console.log(`Listening on http://${DOMAIN}:${PORT}`);
});
// run with `node server.mjs`
