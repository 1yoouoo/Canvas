let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorArray = [
    '#3D5AB3',
    '#273859',
    '#3C6AA6',
    '#6CA6D9',
    '#4F5759'
]
let mouse = {
    x : undefined,
    y : undefined
}

let maxRadius = 20
let minRadius = 2

let gravity = 0.97
let friction = 0.99

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


class Circle {
    
    init() {
        this.radius = Math.floor(Math.random() * maxRadius) + minRadius;
        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius ; 
        this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius ;
        this.dx = (Math.random() - 0.5);
        this.dy = (Math.random() - 0.5);
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'white';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
    
    move() {
        // 화면 밖에가면 부딪히는 작용
        if (this.x + this.radius + this.dx > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
        
        this.x += this.dx;
        if (this.y + this.radius + this.dy > innerHeight) {
            this.dy = -this.dy * friction ;
        }
        else {
            this.dy += gravity;
        }
        this.y += this.dy;
        
    }
    
}

let circle_list = [];

for(let i=0; i<100; i++) {
    let circle = new Circle();
    circle.init()
    circle_list.push(circle)
}

function animate() {
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i=0; i<100; i++) {
        let circle = circle_list[i];
        circle.draw();
        circle.move();
    }
}
animate();
