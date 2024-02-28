//In Backend I install express, socket.io, dotenv
npm init, 
//Tools:
Explanation:

- The code provides functionality for toggling the visibility of tools, displaying pencil and eraser tools, uploading images, and creating plain or image-based sticky notes.
- Event listeners are attached to various elements to handle user interactions such as clicks and file uploads.
- Functions are defined to encapsulate different functionalities such as opening/closing tools, creating sticky notes, and enabling dragging and dropping.


//Canvas
Explanation:

The sections that work are the event listeners for mouse actions on the canvas, undo and redo functionalities, drawing strokes, handling pencil color and width changes, eraser functionality, and download feature.
The commented-out sections include code related to directly drawing strokes on the canvas without using sockets. These sections are commented out because the strokes are now drawn based on data received from the server via socket.io.


App.js
Explanation:

The code sets up a basic Express.js server and serves static files from the "public" directory.
Socket.IO is initialized and attached to the same server instance created by Express.
When a new socket connection is established (connection event), the server logs a message indicating the connection.
Event listeners are set up to handle specific events (beginPath, drawStroke, redoUndo) sent from clients.
When these events are received from a client, the server emits the same event to all connected clients using io.sockets.emit().