//저장하기 : 승재꺼에서 가져옴
const canvas = document.getElementById("canvas");
const saveBtn = document.getElementById("saveBtn");

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "MYPAINT";
  link.click();
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//그리기
let isAbleDraw = false;

// make_base();
//
// function make_base()
// {
//   var _cvs = document.querySelector("#canvas"),
//   _ctx = _cvs.getContext("2d"),
//   _img = new Image();
//
//   _img.src = "../images/hand.jpg";
//   _img.onload = function(e) {
//     _ctx.drawImage(_img, 0, 0, 550, 600);
//   }
// }

const options = {
  type: 'stroke',
  strokeStyle: 'blue',
  lineWidth: 5,
};

const rects = [];
let currentRect = null;
document.getElementById('canvas').addEventListener('mousedown', () => {
  isAbleDraw = true;
  currentRect = {
    type: options.type,
    strokeStyle: options.strokeStyle,
    lineWidth: options.lineWidth,
    coordinates: [],
  };
});
document.getElementById('canvas').addEventListener('mousemove', (e) => {
  if (isAbleDraw) {
    const ctx = e.target.getContext('2d');
    const [x, y] = [e.offsetX, e.offsetY];
    currentRect.coordinates.push([x, y]);
    drawTools.clear();
    drawTools.execute(rects);
    if (currentRect.type === 'stroke') drawTools.stroke(currentRect.coordinates, 'rgba(255, 255, 0, .1)', currentRect.lineWidth);
    if (currentRect.type === 'eraser') drawTools.eraser(currentRect.coordinates, currentRect.lineWidth);
  }
});
document.getElementById('canvas').addEventListener('mouseup', () => {
  isAbleDraw = false;
  rects.push(currentRect);
  drawTools.clear();
  currentRect = null;
  drawTools.execute(rects);
  console.log(rects);
})

const drawTools = {
  clear() {
    // 캔버스 내용 제거
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  stroke(coordinates, color, lineWidth) {
    // 마우스가 이동한 경로를 따라 실선 그리기
    if (coordinates.length > 0) {
      const ctx = document.getElementById('canvas').getContext('2d');
      const firstCoordinate = coordinates[0];
      ctx.beginPath();
      ctx.moveTo(firstCoordinate[0], firstCoordinate[1]);
      for (let i = 1; i < coordinates.length; i += 1) {
        ctx.lineTo(coordinates[i][0], coordinates[i][1]);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.closePath();
    }
  },
  eraser(coordinates, lineWidth) {
    // 마우스가 이동한 좌표에 따라 하얀색으로 원을 그려서 지우개 기능처럼 동작
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < coordinates.length; i += 1) {
      ctx.beginPath();
      const coordinate = coordinates[i];
      const [x, y] = coordinate;
      ctx.fillStyle = 'white';
      ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  },
  execute(rects) {
    // rects 배열에 저장 된 도형을 기준으로 다시 캔버스에 그림
    for (let i = 0; i < rects.length; i += 1) {
      const rect = rects[i];
      const {
        type
      } = rect;
      if (type === 'stroke') this.stroke(rect.coordinates, rect.strokeStyle, rect.lineWidth);
      if (type === 'eraser') this.eraser(rect.coordinates, rect.lineWidth);
      if (type === 'square') this.square(rect.coordinates, rect.strokeStyle);
    }
  }
};
document.getElementById('type').addEventListener('change', (e) => {
  options.type = e.target.value;
});
document.getElementById('strokeStyle').addEventListener('change', (e) => {
  options.strokeStyle = e.target.value;
});
document.getElementById('lineWidth').addEventListener('change', (e) => {
  options.lineWidth = e.target.value;
});
