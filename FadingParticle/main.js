const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

let mouse = {
    x: null,
    y: null    
}

let particles = [];

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

setInterval(()=>{ //whenever mouse moves new object is created so it disabled it every 0.2sec
    mouse.x = undefined;
    mouse.y = undefined;
}, 200)

class Particle{
    constructor(x, y, weight, size, color){
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.size -= 0.5;
        if(this.size < 0 ){
            this.x = mouse.x + ((Math.random()*20) - 10);
            this.y = mouse.y + ((Math.random()*20) - 10);
            this.size = Math.random()* 5 + 2;
            this.weight = Math.random()*10-.5;
        }
        this.y += this.weight;
        this.weight += .2

        if(canvas.height < this.y - this.size){
            this.weight *=  -1;
        }
    }
}

function init(){
    for (let i = 0; i < 100; i++) {
        let size = Math.random()*5 + 2;
        let x = Math.random(canvas.width) + size*2;
        let y = Math.random(canvas.height) + size*2;
        let weight = 1;
        let color = 'pink';
        particles.push(new Particle(x, y,  weight, size, color));
    }
}
function animate(){
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    //each step of animation, 
    //semi-transparent rectangle is layering on top of itself over and over, 
    //slowly hiding all the particles and creating trails
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; 
    ctx.fillRect(0,0,canvas.width, canvas.height);
    particles.forEach((p)=>{
        p.update();
        p.draw();
    })
    requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})