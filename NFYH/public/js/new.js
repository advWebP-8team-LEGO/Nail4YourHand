var myCanvas;
var ctx;
var del = 0;
var flag = false;
var width_e = 25;

var setWidthP = function(event) {
  // 펜 굵기 조절
  width_p = Number(document.getElementById("width_p").value);
  ctx.lineWidth = width_p;
}

var setWidthE = function(event) {
  // 지우개 굵기 조절
  width_e = Number(document.getElementById("width_e").value);
}

var setColorTb = function(event) {
  //색깔 가져오기
  x = event.target.id;
  ctx.strokeStyle = x;
}

var setColor = function() {
  //색깔 가져오기
  color = document.getElementById("color").value;
  ctx.strokeStyle = color;
}

var ready = function() {
  myCanvas = document.getElementById("canvas");
  ctx = myCanvas.getContext("2d");
  myCanvas.onmousedown = drawStart;
  myCanvas.onmousemove = drawing;
  window.onmouseup = drawEnd;

  ctx.lineWidth = 5;
}

var drawStart = function(event) {
  ctx.beginPath();
  var xpos = event.target.offsetLeft;
  var ypos = event.target.offsetTop;
  ctx.moveTo(event.clientX - xpos, event.clientY - ypos);
  flag = true;
}


var drawing = function(event) {
  if (flag) {
    var xpos = event.target.offsetLeft;
    var ypos = event.target.offsetTop;
    ctx.lineCap = 'round'

    if (del == 0) {
      ctx.lineTo(event.clientX - xpos, event.clientY - ypos);
    } else if (del == 1) {
      ctx.clearRect(event.clientX - xpos, event.clientY - ypos, width_e, width_e);
    }

    ctx.stroke();
  }
}

var drawEnd = function(event) {
  flag = false;
}

var pen = function() {
  del = 0;
}

var eraser = function() {
  del = 1;
}

var chLeft = function() {
  $('canvas').css({
    'background' : 'url(/images/left.png)',
    'background-repeat' : 'no-repeat',
    'background-position':'150px 0'
  });
  $('#left').css({
    'background-color': '#F05173',
    'color': 'white'
  });
  $('#right').css({
    'background-color': 'white',
    'color': '#F05173'
  });
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

var chRight = function() {
  $('canvas').css({
    'background' : 'url(/images/right.png)',
    'background-repeat' : 'no-repeat',
    'background-position':'150px 0'
  });
  $('#right').css({
    'background-color': '#F05173',
    'color': 'white'
  });
  $('#left').css({
    'background-color': 'white',
    'color': '#F05173'
  });
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

//저장하기
$(function() {
  $("#saveBtn").on("click", function() {
    html2canvas(document.querySelector("#canvas")).then(canvas => {
      saveAs(canvas.toDataURL('image/png'), "MYPAINT.png");
    });
  });

  function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
});