const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");
ws.on("open", (event) => {
	console.log(event);
});
ws.on("message", (event) => {
	console.log(event);
	if (event.message === "ping")
		return ws.emit("message", {
			message: "pong",
			data: undefined,
		});
});
setInterval(() => {
	ws.emit("message", {
		message: "ping",
		data: undefined,
	});
	console.log("Pinging");
}, 2000);
