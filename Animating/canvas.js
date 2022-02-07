let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




//화면 밖에 끼이는 버그있음

let radius = 30;
let x = Math.random() * (innerWidth - radius * 2) + radius ; 
let y = Math.random() * (innerHeight - radius * 2) + radius ;
let dx = (Math.random() - 0.5) * 8;
let dy = (Math.random() - 0.5) * 8;
function circle() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

function animate() {
    circle();

    if(x + radius > innerWidth || x - radius < 0) {
        dx = -dx;
    }

    else if (y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
    }


    x += dx;
    y += dy;

}

animate();