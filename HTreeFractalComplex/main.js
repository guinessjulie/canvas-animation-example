const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d');
const genButton = document.querySelector('genButton');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2){
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = color2;
    ctx.strokeStyle = color1;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY)
    ctx.rotate(angle*Math.PI/180);
    ctx.moveTo(0, 0);
    //ctx.lineTo(0, -len);
    if(angle < 0){
        ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len);
    }
    if(angle>0){
        ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len);
    }
    ctx.stroke();

    if (len < 15){
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    drawTree(0, -len, len*0.75, angle+7, branchWidth* 0.6 );
    drawTree(0, -len, len*0.75, angle-7,branchWidth *0.6 )
    ctx.restore();
};

drawTree(canvas.width/2, canvas.height - 80, 120, 0, 25, 
    'brown', 'pink');
window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height= innerHeight;
})