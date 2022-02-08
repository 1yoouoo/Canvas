let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 마우스를 올렸을 때 사이즈가 커지고 마우스에서 멀어지면 사이즈가 작아지게 만들자.
    //1. 현재 마우스의 좌표 뽑기
    //2. 각각의 원의 좌표 뽑기
    //3. 1,2의 좌표를 비교하기
    //4. 그에 맞는 조건문 생성
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

class Circle {
    
    init() {
        this.radius = 3;
        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius ; 
        this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius ;
        this.dx = (Math.random() - 0.5);
        this.dy = (Math.random() - 0.5);
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 
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

for(let i=0; i<500; i++) {
    let circle = new Circle();
    circle.init()
    circle_list.push(circle)
}

function animate() {
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i=0; i<500; i++) {
        let circle = circle_list[i];
        circle.draw();
        circle.move();
        // console.log(x,y)
    }
}
animate();
