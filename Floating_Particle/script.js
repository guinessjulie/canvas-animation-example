const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particlesArray;

function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

const colors = ['rgba(247, 245, 247, 0.5)',
    'rgba(252, 238, 237, 0.5)',
    'rgba(237, 247, 252, 0.5)',
    'rgba(245, 233, 247, 0.5)'
]



//add Draw Method to Particle Prototype
Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

//add update method  particle prototype
Particle.prototype.update = function(){
    if(this.x + this.size > canvas.width ||
        this.x - this.size < 0){
            this.directionX = -this.directionX;
    }
    if(this.y + this.size > canvas.height ||
        this.y - this.size < 0){
            this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}

//create particle Array0
function init(){
    particlesArray = [];
    //let's create 100 particles and push it to array
    for (let i = 0; i < 100; i++) {
        let size = Math.floor(Math.random()*20);
        let x = Math.floor(Math.random()*innerWidth-(size*2));
        let y = Math.floor(Math.random()*innerHeight-(size*2));
        //directionX, Y = [-.2:.2]
        let directionX = Math.floor(Math.random()*.4 - .2)
        let directionY = Math.floor(Math.random()*.4 - .2);
        let color = colors[Math.floor(Math.random()*4)];
        particlesArray.push(new Particle(x, y, directionX, directionY,size, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight)
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();        
    }
}

//
window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.h
});
init();
animate();