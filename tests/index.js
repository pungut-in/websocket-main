const Websocket = require("ws");
const ws = new Websocket("ws://localhost:3000");

ws.on("message", (msg) => {
	console.log(msg);
});
