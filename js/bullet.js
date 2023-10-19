class Bullet {
    constructor(ctx, x, y, clientX, clientY) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = 'assets/projectile.png'; 
        this.radius = 5;
        this.hit = false
        
        const dx = clientX - x;
        const dy = clientY - y;
     
        
        const length = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / length)*100;
        this.vy = (dy / length)*100;


        // viendo el sentido de la velocidad
        if (this.vx > 0) {
            x += 20;
        }
        if (this.vy < 0) {
            y -= 20;
        }

        this.x = x + this.vx
		this.y = y + this.vy

        this.frameIndex = 0;
		this.frames = 1;
	
        this.rotation = Math.atan2(dy, dx)
        
    }

     checkCollisionWithZombie(zombie) {
        const dx = this.x - (zombie.x + zombie.w / 2);
        const dy = this.y - (zombie.y + zombie.h / 2); 
        const distance = Math.sqrt(dx * dx + dy * dy); 

        return distance < this.radius + zombie.w / 2; 
    }

    draw() {
        this.ctx.save(); 
        this.ctx.translate(this.x, this.y); 
        this.ctx.rotate(this.rotation); 
        this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2); 
        this.ctx.restore();
    }

    move() {
       
        
    
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        this.x += this.vx;
        this.y += this.vy;
        
    }
}


