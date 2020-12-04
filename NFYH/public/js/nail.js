const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementById("strokeStyle");
const range = document.getElementById("js-range");
const saveBtn = document.getElementById("saveBtn");
const image = document.createElement("img");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let eraseMode = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else {
    if(!eraseMode) {
      ctx.lineTo(x,y);
    } else {
      ctx.clearRect(x,y,20,20);
    }
    ctx.stroke();
  }
}

function setColorTb(event) {
  //색깔 가져오기
  const selectedColor = event.target.id;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
}

var setColor = function() {
  //색깔 가져오기
  const selectedColor = document.getElementById("color").value;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

const changeToPen = () => {
  eraseMode = false;
}

const changeToEraser = () => {
  eraseMode = true;
}

function handleCanvasClick() {
  if (filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png"); 
  const link = document.createElement("a");
  link.href = image;
  link.download = "MYPAINT";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if(range) {
  range.addEventListener("input", handleRangeChange);
}