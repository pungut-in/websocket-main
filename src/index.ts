import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { APIResponse } from "../index";
import WebSocket from "ws";

dotenv.config();
const PORT = parseInt(process.env.PORT as string) || 3000;
const WSPORT = parseInt(process.env.WS_PORT as string) || 8080;
const ws = new WebSocket.WebSocketServer({
	port: WSPORT,
});
ws.on("connection", () => {
	console.log("New socket connection");
});
const client = express();

client.use(express.json());

client.all("/", (_req: Request, res: Response) => {
	res.status(200);
	return res.json({
		status: 200,
		code: "OK",
		is_boolean: true,
		message: "OK",
		data: {},
	} as APIResponse);
});
client.listen(PORT, () => {
	console.log("Endpoint on port " + PORT);
	console.log("Websocket endpoint on port " + WSPORT);
	return;
});

export default {
	ExpressClient: client,
	WebsocketClient: ws,
};
