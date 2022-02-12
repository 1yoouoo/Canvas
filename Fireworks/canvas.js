const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x : innerWidth,
    y : innerHeight
}

class Circle {
    init() {
        this.radius = 10;
        this.x = mouse.x;
        this.y = mouse.y;
        this.dx = 1
        this.dy = 1

        this.color = '#3D5AB3';
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'white';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    move(){
        this.x += this.dx
        this.y += this.dy
    }
}
let circles = []
let circle = new Circle();

function animate() {
    requestAnimationFrame(animate);
    circle.draw();
    circle.move();
}
animate();

addEventListener('click', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    for(let i=0; i<5; i++) {
        circle.init()
        circles.push(circle)
        console.log(mouse.x, mouse.y, circles)
    }
})
