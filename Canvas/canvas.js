let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rectangle
let ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(60, 60, 150 ,150);
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(400, 70, 150 ,150);
ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
ctx.fillRect(30, 400, 150 ,150);
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(370, 760, 150 ,150);
ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
ctx.fillRect(600, 300, 150 ,150);

// Line
ctx.beginPath();
ctx.moveTo(90, 760);
ctx.lineTo(200, 180);
ctx.lineTo(790, 500);
ctx.strokeStyle = '#fa34a3'
ctx.stroke();


// Circle

for (i = 0; i < 15; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    
}