let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let pencilColor=document.querySelectorAll(".pencil-color")
let pencilWidthElem=document.querySelector(".pencil-width");
let eraserWidthElem=document.querySelector(".eraser-width");
let download=document.querySelector(".download");
let redo=document.querySelector(".redo");
let undo=document.querySelector(".undo");
let penColor="red";
let eraserColor="white";
let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;

let undoRedoTracker=[]; //data
let track=0; //represent with action from tracker array
let mouseDown=false;
//API
let tool=canvas.getContext("2d");// to draw graphics
tool.strokeStyle=penColor; //color
tool.lineWidth=penWidth; //width

//mouseDown-> start new path, mousemove-> path fill (graphics)
canvas.addEventListener("mousedown", (e)=>{
    mouseDown=true;
  beginPath({
    x:e.clientX,
    y:e.clientY
  })
let data={
    x:e.clientX,
    y:e.clientY
}
 // send data to server
socket.emit("beginPath", data);
});
canvas.addEventListener("mousemove",(e)=>{
    // drawStroke({
    //     x:e.clientX,
    //     y:e.clientY
    //   }){
        if(mouseDown){
        let data={ 
        x:e.clientX,
        y:e.clientY,
        color:eraserFlag? eraserColor:penColor,
        width: eraserFlag? eraserWidth:penWidth
      }
      // send data to server
      socket.emit("drawStroke", data);

    }}
);
canvas.addEventListener("mouseup",(e)=>{
    mouseDown=false;
    let url=canvas.toDataURL();
    undoRedoTracker.push(url);
    track=undoRedoTracker.length-1;
})

// Undo button functionality
undo.addEventListener("click",(e)=>{
    if(track > 0) track--;
    //track action
    let data={
        trackValue:track,
        undoRedoTracker
       }
    //undoRedoCanvas(trackObj)
    socket.emit("redoUndo", data);
})

// Redo button functionality
redo.addEventListener("click",(e)=>{
    if(track < undoRedoTracker.length-1) track++
    //track action
    let data={
        trackValue:track,
        undoRedoTracker
       }
    //undoRedoCanvas(trackObj)
    socket.emit("redoUndo", data);
})

// Function to handle undo and redo actions on the canvas
function undoRedoCanvas(trackObj){
    track= trackObj.trackValue;
    undoRedoTracker=trackObj.undoRedoTracker;
    let url= undoRedoTracker[track];
    let img= new Image(); //new img reference element
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0 ,0, canvas.width, canvas.height)
    }
}

// Function to begin drawing path
function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

// Function to draw stroke
function drawStroke(strokeObj){
    tool.strokeStyle=strokeObj.color;
    tool.lineWidth=strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}

// Functionality related to pencil color and width
pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color=colorElem.classList[0];
        penColor=color;
        tool.strokeStyle=penColor;
       
    })
    pencilWidthElem.addEventListener("change",(e)=>{
        penWidth=pencilWidthElem.value;
        tool.lineWidth=penWidth
    })
    eraserWidthElem.addEventListener("change",(e)=>{
        eraserWidth=eraserWidthElem.value;
        tool.lineWidth=penWidth;
    })
})

// Functionality related to eraser
eraser.addEventListener("click",(e)=>{
    if(eraserFlag) {
        tool.strokeStyle=eraserColor;
        tool.lineWidth=eraserWidth;
    }
    else {
        tool.strokeStyle=penColor;
        tool.lineWidth=penWidth;
    }
})

// Download feature
download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();
    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})

// Socket event listeners
socket.on("beginPath",(data)=>{
    // Data from server, begin drawing path
    beginPath(data);
})

socket.on("drawStroke", (data) => {
    // Data from server, draw stroke
    drawStroke(data);
})

socket.on("redoUndo", (data) => {
    // Data from server, handle undo and redo actions
    undoRedoCanvas(data);
})
