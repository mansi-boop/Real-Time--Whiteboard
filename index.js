const express = require("express"); // Import Express.js framework
const socket = require("socket.io"); // Import Socket.IO library

const app = express(); // Initialize Express application
app.use(express.static("public")); // Serve static files from the "public" directory

let port = process.env.PORT || 3000; // Define the port number for the server
let server = app.listen(port, () => { // Start the server
    console.log("Listening on port " + port); // Log that the server is running
});

let io = socket(server); // Initialize Socket.IO and pass the server instance

// Socket.IO event handling
io.on("connection", (socket) => {
    console.log("Made socket connection"); // Log when a new socket connection is established

    // Handle "beginPath" event from client
    socket.on("beginPath", (data) => {
        // Receive data from client and emit it to all connected clients
        io.sockets.emit("beginPath", data);
    });

    // Handle "drawStroke" event from client
    socket.on("drawStroke", (data) => {
        // Receive data from client and emit it to all connected clients
        io.sockets.emit("drawStroke", data);
    });

    // Handle "redoUndo" event from client
    socket.on("redoUndo", (data) => {
        // Receive data from client and emit it to all connected clients
        io.sockets.emit("redoUndo", data);
    });
});
