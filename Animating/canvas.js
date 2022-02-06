let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;






let x = Math.random() * innerWidth;
let y = Math.random() * innerHeight;
let dx = 3;
let dy = 3;
let radius = 50;
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    if(x + radius > innerWidth || x < radius) {
        dx = -dx;
    }

    else if (y + radius> innerHeight || y < radius) {
        dy = -dy;
    }


    x += dx;
    y += dy;

}

animate();