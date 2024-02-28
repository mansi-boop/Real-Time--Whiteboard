let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

// Function to toggle visibility of tools
optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) openTools(); // If options are open, close them
  else closeTools(); // If options are closed, open them
});

// Function to open tools
function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex"; // Display tools container
}

// Function to close tools
function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none"; // Hide tools container

  // Also hide pencil and eraser tool containers
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

// Event listener for pencil tool
pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag; // Toggle pencil flag
  if (pencilFlag) {
    pencilToolCont.style.display = "block"; // Show pencil tools if flag is true
    // document.body.style.cursor = "url('icons/Pencil.svg'), auto"; // Uncomment this line if you want to change cursor when using pencil
  } else {
    pencilToolCont.style.display = "none"; // Hide pencil tools if flag is false
    // document.body.style.cursor = "auto"; // Uncomment this line to revert cursor to default
  }
});

// Event listener for eraser tool
eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag; // Toggle eraser flag
  if (eraserFlag) {
    eraserToolCont.style.display = "flex"; // Show eraser tools if flag is true
  } else {
    eraserToolCont.style.display = "none"; // Hide eraser tools if flag is false
  }
});

// Event listener for upload feature
upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = `
      <div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
      </div>
      <div class="note-cont">
          <img src="${url}"/>
      </div>
      `;
    createSticky(stickyTemplateHTML); // Create a sticky note with uploaded image
  })
});

// Event listener for creating a plain sticky note
sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML = `
  <div class="header-cont">
      <div class="minimize"></div>
      <div class="remove"></div>
  </div>
  <div class="note-cont">
      <textarea spellcheck="false"></textarea>
  </div>
  `;
  createSticky(stickyTemplateHTML); // Create a plain sticky note
});

// Function to create a sticky note
function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

  // Enable dragging and dropping of sticky note
  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
}

// Function to handle actions on sticky note
function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove(); // Remove sticky note when remove button is clicked
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block"; // Toggle visibility of sticky note content
    else noteCont.style.display = "none";
  });
}

// Function to enable dragging and dropping of elements
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
}
