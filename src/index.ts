import express, { Request, Response } from "express";
// import redis from "redis";
import morgan from "morgan";
import bodyParser from "body-parser";
import { WebSocket, WebSocketServer } from "ws";
import { createServer, IncomingMessage } from "http";
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({
	server,
});

wss.on("connection", (socket: WebSocket, req: IncomingMessage) => {
	//On connected,
	console.log("Request from: " + req.socket.remoteAddress);
});

server.on("upgrade", (request, socket, head) => {
	// Authenticate here
	console.log(request, socket, head);
	/**
	 *
	 * Authenticate the request. Check the headers for id, tokens and cross validate with the authentication endpoint. (reference rey)
	 *
	 * If authentication failed, destroy the socket.
	 *
	 * If authentication succeeded, handle the upgrade request.
	 * https://www.npmjs.com/package/ws#client-authentication
	 *
	 * Once socket is created, Loop over all the needed functions and pass the socket in it.
	 *
	 * Using the created socket, create a listener on the redis channel by subscribing to the redis channel based on user id (channel name and user id is the same).
	 *
	 * Subscribe function of a redis client takes a callback. This callback has a message parameter.
	 * https://blog.logrocket.com/using-redis-pub-sub-node-js/#using-redis-pub-sub
	 *
	 * On the callback, emit message to the connected socket based on upgrade.
	 *
	 */
});

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.all("/", (req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		isValid: true,
		data: null,
	});
});

server.listen(3000, () => {
	console.log("Listening on port 3000");
});
