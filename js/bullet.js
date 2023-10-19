class Bullet {
    constructor(ctx, x, y, clientX, clientY) {
        this.ctx = ctx;
  
        this.radius = 5;
        
        const dx = clientX - x;
        const dy = clientY - y;
     
        
        const length = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / length)*2;
        this.vy = (dy / length)*2;

        this.x = x + this.vx*30
		this.y = y + this.vy*30

        this.frameIndex = 0;
		this.frames = 1;
	

        
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.closePath();
        console.log(this.x);
    }

    move() {
       
        
    
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        this.x += this.vx;
        this.y += this.vy;
        
    }
}


