const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colorArray = [
    '#08495D',
    '#0B7074',
    '#0F8C83',
    '#F18E65',
    '#EF746B'
]

const maxRadius = 20;
const minRadius = 2;
let circleNumber = 100;

let gravity = 0.97;
let airFriction = 0.90;
let floorFriction =0.99;


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Board {
    
    init() {
        let circleList = [];
        let obstacle = new Obstacle();

        for(let i=0; i<circleNumber; i++) {
            let circle = new Circle();
            circleList.push(circle);
        }

        obstacle.init(200, 400, 360, 20);

        for(let i=0; i<circleNumber; i++) {
            let circle = circleList[i];
            let x = Math.random() * (innerWidth - maxRadius * 2) + maxRadius;
            let y = Math.random() * (innerHeight - maxRadius * 2) + maxRadius;
            
            
            if((obstacle.x - maxRadius < x && obstacle.x + obstacle.width + maxRadius > x) && (obstacle.y - maxRadius < y && obstacle.y + obstacle.height + maxRadius > y)){
                x += obstacle.width + maxRadius * 2;
                y += obstacle.height + maxRadius * 2;
            }
            circle.init(x, y);
        }

        function animate() {
            requestAnimationFrame(animate);
            
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            obstacle.draw();
            
            for(let i=0; i<circleNumber; i++) {
                let circle = circleList[i];

                circle.draw();
                circle.move(obstacle);
            }
        }


        animate();
    }
}

class Obstacle {
    
    init(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
    }
    draw() {
        const xGap = 75;
        const yGap = 50;

        ctx.fillStyle = "#A86EC4";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        
        
        ctx.fillStyle = "#520778";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x- xGap, this.y + yGap);
        ctx.lineTo(this.x- xGap, this.y + this.height + yGap);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.fill();
        
        
        ctx.fillStyle = "#3E3758";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        ctx.lineTo(this.x - xGap, this.y + this.height + yGap);
        ctx.lineTo(this.x + this.width - xGap, this.y + this.height + yGap);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.fill();
        
        
    }
}


class Circle {
    
    init(x, y) {
        this.radius = Math.floor(Math.random() * maxRadius) + minRadius;
        this.x = x;
        this.y = y;
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
    
    move(obstacle) {
        if (this.x + this.radius + this.dx > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        this.x += this.dx;

        if (this.y + this.radius + this.dy > innerHeight 
            || ((this.y + this.radius + this.dy > obstacle.y ) && (this.y + this.radius + this.dy) < (obstacle.y + obstacle.height)) 
            && ((this.x + this.radius + this.dx > obstacle.x) && (this.x + this.radius + this.dx < (obstacle.x + obstacle.width) ))
            ) {
            this.dy *= -airFriction ;
            this.dx *= floorFriction;
        }
        else {
            this.dy += gravity;
        }
        this.y += this.dy;
    }
    
}

new Board().init();

