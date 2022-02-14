const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x : innerWidth,
    y : innerHeight
}
const gravity = 0.05;
const friction = 0.999;
const circleNumber = 500;
const angleIncrement = (Math.PI * 2) / circleNumber;
const power = 7
let opacity = 1;
let circles = [];

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    circles.forEach((circle, i) => {
        if(circle.opacity > 0){
            circle.draw();
            circle.move(circle.dx, circle.dy);
        } else {
            circles.splice(i, 1);
        }
    }
)}

class Circle {
    init(dx, dy, opacity) {
        this.radius = 3;
        this.x = mouse.x;
        this.y = mouse.y;
        this.dx = dx
        this.dy = dy
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.opacity = opacity;
    }
    
    draw(){
        ctx.save()
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        //end
        ctx.restore()
    }
    
    move(dx, dy){
        this.opacity = Math.max(0, this.opacity - 0.005)
        this.dy += gravity
        this.dx *= friction
        this.dy *= friction
        this.x += dx
        this.y += dy
    }
}


addEventListener('click', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    for(let i=0; i<circleNumber; i++) {
        let circle = new Circle();
        let dx = (Math.cos(angleIncrement * i) * Math.random()) * power;
        let dy = (Math.sin(angleIncrement * i) * Math.random()) * power;
        circle.init(dx, dy, opacity);
        circles.push(circle);
    }
    console.log(circles)
})
animate();

