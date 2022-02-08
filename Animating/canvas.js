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

let maxRadius = 30
let minRadius = 3

window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX
    mouse.y = event.clientY
})
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


class Circle {
    
    init() {
        this.radius = 3;
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
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        else if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        else if (this.radius > minRadius) {this.radius -= 1}
    }
    
}

let circle_list = [];

for(let i=0; i<800; i++) {
    let circle = new Circle();
    circle.init()
    circle_list.push(circle)
}

function animate() {
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i=0; i<800; i++) {
        let circle = circle_list[i];
        circle.draw();
        circle.move();
    }
}
animate();
