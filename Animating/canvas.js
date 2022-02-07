let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {

    init() {
        this.radius = 30;
        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius ; 
        this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius ;
        this.dx = (Math.random() - 0.5);
        this.dy = (Math.random() - 0.5);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
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
    }
}



// function init() {
//     let c1 = new Circle();
//     let c2 = new Circle();

//     c1.init();
//     c2.init();

//     function animate() {
//         requestAnimationFrame(animate);
//         ctx.clearRect(0, 0, innerWidth, innerHeight);
//         c1.move();
//         c1.draw();
//         c2.move();
//         c2.draw();
//     }
//     animate();

// }


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