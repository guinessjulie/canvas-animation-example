const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let mouse={
    x:null,
    y:null
}
let particles = [];
const particleLength = 100;
setInterval(()=>{
    mouse.x = undefined;
    mouse.y = undefined;
}, 200)

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

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
         this.size -= 0.05;
         if(this.size < 0 ){
             this.x = (mouse.x + ((Math.random()*20)-10));
             this.y = (mouse.y + ((Math.random()*20)-10));
             this.size = (Math.random() * 20) +10;
             this.weight = (Math.random() *2) - 0.5;
         }
         this.y += this.weight;
         this.weight += 0.2;
         if(this.y > canvas.height - this.size){
             this.weight *= -0.5;
         }
     }

}

function init(){
    particles = [];
    for (let i = 0; i < particleLength; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 15) + 10;
        let color = 'pink';
        let weight = 1;
        particles.push(new Particle(x, y, weight, size, color));
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0 ; i <particles.length; i++){
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})