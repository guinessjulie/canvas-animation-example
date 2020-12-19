const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const genButton = canvas.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2,){
    console.log(len);
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle= color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle*Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    if(len < 10){
        ctx.restore();
        return;    
    }

    //play with angle
    drawTree(0, -len, len*0.75, angle+15, branchWidth )
    drawTree(0, -len, len*0.75, angle-18, branchWidth )
    ctx.restore();

}

//play with angle makes tree asymmetry
drawTree(canvas.width/2, canvas.height - 80, 120, 0, 2, 'lightgreen', 'green');
window.addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})