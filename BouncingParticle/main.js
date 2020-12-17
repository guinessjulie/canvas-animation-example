const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const maxSize = 30;
const minSize = 0;
let particles ;
const numParticles = 100;

const colorsPastel = [
    '#b3e3fc',
    '#d4ffd9',
    '#fce7e6',
    '#f1e6fc',
    '#e6e9fc'
]

const mouse = {
    x : null,
    y: null
}

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

setInterval(()=>{
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
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.size -= 0.05;
        if(this.size < 0){
            this.x = mouse.x + ((Math.random()*20) - 10);
            this.y = mouse.y + ((Math.random()*20) - 10);
            this.size = (Math.random()*maxSize) + 2 //between 2 to 12
            this.weight = (Math.random()*2) - 0.5 //between -0.5 to 1.5
        }
        this.y += this.weight;
        this.weight += 0.2;
        if(this.y > canvas.height - this.size){
            this.weight *= -1; //reverse direction
        }

    }
}
function init(){
    particles = [];
    for(let i = 0; i<numParticles; i++){
        let size = Math.floor(Math.random()*5)+2;
        let weight = 1;
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        let color = colorsPastel[Math.floor(Math.random()*(colorsPastel.length))]
        particles.push(new Particle(x, y, weight, size, color));
    }
}


function animate(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i<particles.length; i++){
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate)
}

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height  = window.innerHeight;
})

init();
animate();