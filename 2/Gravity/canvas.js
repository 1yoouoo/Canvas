let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorArray = [
    '#08495D',
    '#0B7074',
    '#0F8C83',
    '#F18E65',
    '#EF746B'
]
let mouse = {
    x : undefined,
    y : undefined
}

let maxRadius = 20
let minRadius = 2

let gravity = 0.97
let airFriction = 0.90
let floorFriction =0.99


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Board {
    init() {
        let circle_list = [];
        let obstacle = new Obstacle();

        for(let i=0; i<30; i++) {
            let circle = new Circle();
            circle_list.push(circle);
        }


        obstacle.init(200, 400, 360, 20);

        for(let i=0; i<30; i++) {
            // debugger;
            let x = Math.random() * innerWidth;
            let y = Math.random() * innerHeight;

            // 겹침
            if((obstacle.x <= x && (obstacle.x + obstacle.width) >= x) &&
                (obstacle.y <= y && (obstacle.y + obstacle.height) >= y)){
                    x += obstacle.width
                    y += obstacle.height
                }
            circle_list[i].init(x, y);
        }

        function animate() {
            requestAnimationFrame(animate);
            
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            obstacle.draw();
            
            for(let i=0; i<30; i++) {
                let circle = circle_list[i];
                circle.draw();
                // circle.move();
            }
        }


        animate();

    }
}

class Obstacle {
    
    init(x, y, width, height) {
        this.x = x
        this.y = y 
        this.width = width 
        this.height = height 
        
    }
    draw() {
        const xGap = 75
        const yGap = 50

        ctx.fillStyle = "#A86EC4";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        
        
        ctx.fillStyle = "#520778";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x- xGap, this.y + yGap);
        ctx.lineTo(this.x- xGap, this.y + this.height + yGap);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.fill();
        
        
        ctx.fillStyle = "#091437";
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
        //(200, 400), (560, 420) 에 스폰되면 안됨

        // this.x = innerWidth - (Math.random() * (400 - this.radius * 2) + this.radius);
        // this.x = x * (innerWidth - this.radius * 2) + this.radius;
        this.x = x;
        this.y = y;
        // && !(200 < Math.random() * (innerWidth - this.radius * 2) + this.radius < 400));

        // this.y = y * (innerHeight - this.radius * 2) + this.radius ;
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
        // 바닥에 충돌할 때
        if (this.x + this.radius + this.dx > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        this.x += this.dx;

        if (this.y + this.radius + this.dy > innerHeight) {
            this.dy *= -airFriction ; // 공기 저항
            this.dx *= floorFriction; // 바닥 마찰력
        }
        else {
            this.dy += gravity;
        }
        this.y += this.dy;
        
        
    }
    
}
// let circle_list = [];

// for(let i=0; i<30; i++) {
//     let circle = new Circle();
//     circle.init();
//     circle_list.push(circle);
// }

// let obstacle = new Obstacle();


// function animate() {
//     requestAnimationFrame(animate);
    
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     obstacle.init(200, 400, 360, 20);
//     obstacle.draw();
    
//     for(let i=0; i<30; i++) {
//         let circle = circle_list[i];
//         circle.draw();
//         // circle.move();
//     }
// }

new Board().init()


// animate();
