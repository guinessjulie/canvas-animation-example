const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;
const speed = 5.0;
const rainbowColors=[
    '#f73214',
    '#f79d2f',
    '#eff288',
    '#8fffad',
    '#3ec8fa',
    '#7d60fc',
    '#dc82fa'
]
let particles = [];
let mouse = {
    x:null,
    y:null,
    radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

//create Particle
class Particle{
    constructor(x, y, dirX, dirY, size, color){
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    //check if it hits the wall
    update(){
        if(this.x < 0 || this.x > canvas.width){
            this.dirX *= -1;
        }
        if(this.y <0 || this.y > canvas.height){
            this.dirY *= -1;
        }
        //collision detection between mouse cursor and the particle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < this.size + mouse.radius){ 
            //check which side of the particle is coming from 
            //so we can decide which direction  we want to push it
            if(mouse.x < this.x && //mouse is left
                this.x < canvas.width - this.size *10 ) {
                    this.x += 10;
                }
            if(mouse.x >  this.x && 
                this.x > this.size*10){
                    this.x -= 10;
                }
            //mouse is at upper side from the particle, then push down the particle
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y  +=10;
            }

            //mouse is at under the particle, then push up the particle away
            if(mouse.y > this.y  && this.y > this.size*10){
                this.y -= 10;
            }
        }
        //move particle
        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }   
}
function init(){
    particles = [];
    const numParticles = (canvas.height * canvas.width) / 9000;
    for(let i = 0 ; i < numParticles ; i++){
        let size = Math.random() * 5 + 1;
        let x = Math.random()*((innerWidth - size *2) - (size*2)+size*2);
        let y = Math.random()*((innerHeight - size *2) - (size*2)+size*2);;
        let dirX = Math.random()* speed - (speed/2.0);
        let dirY = Math.random()* speed - (speed/2.0);
        let color = rainbowColors[Math.floor(Math.random()*rainbowColors.length)];
        //let color = '#8c5523';
        particles.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let particle of particles){
        particle.update();
    }
    connect();
    requestAnimationFrame(animate);
}

function connect(){
    let opacity = 1.0;
    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            let distance = ((particles[i].x - particles[j].x)*(particles[i].x - particles[j].x))
                +((particles[i].y - particles[j].y)*(particles[i].y - particles[j].y));
            if(distance < ((canvas.width / 7)*(canvas.height /7))){ //if it is close enough 
                opacity = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(140,85,31,' + opacity +')'; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}
init();
animate();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.width /80) * (canvas.height / 80);
    init();
})

window.addEventListener('mouseout', ()=>{
    mouse.x = undefined;
    mouse.y = undefined;
    mouse.radius = undefined;
})
