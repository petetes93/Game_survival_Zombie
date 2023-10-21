class zombie {
    constructor(ctx, canvasW, canvasH, startX, startY, speed) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.w = 120;
        this.h = 120;
        this.img = new Image();
        this.img.src = 'assets/zombie.png';
        this.x = startX; // Posición inicial aleatoria
        this.y = startY; // Posición inicial aleatoria
        this.speed = speed; // Velocidad del zombie

        this.life = 1

        this.frames = 17;
        this.frameIndex = 0;
        this.frameCounter = 0;
    }
    
	getCollisionRect() {
       
        return {
            x: this.x,
            y: this.y,
            width: this.w-50,
            height: this.h-119.5,
        };

    }
    draw() {
            console.log('aaa');
        this.frameWidth = this.img.width / this.frames;
		this.frameHeight = this.img.height;
	
        this.ctx.save(); 
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2); 
        this.ctx.rotate(this.direction); 
    
		this.ctx.drawImage(
			this.img,
			this.frameIndex * this.frameWidth,
			0,
			this.frameWidth,
			this.frameHeight,
            -this.w / 2,
            -this.h / 2,
            this.w,
            this.h)
      
        this.ctx.restore(); 
    }

    checkCollisionWithPlayer(player) {
        const dx = this.x - (player.x + player.w / 2);
        const dy = this.y - (player.y + player.h / 2); 
        const distance = Math.sqrt(dx * dx + dy * dy); 

        return distance < this.radius + player.w / 2; 
    }
    animateSprite() {

		this.frameCounter++;

		if (this.frameCounter % 6 === 0) {
			this.frameIndex++;

			if (this.frameIndex >= this.frames) {
				this.frameIndex = 0;
			}
		}
	}
    move(playerX, playerY) {
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const angle = Math.atan2(dy, dx);
    
        
        this.direction = angle;
    
        
        const speedX = Math.cos(angle) * this.speed;
        const speedY = Math.sin(angle) * this.speed;
    
        this.x += speedX;
        this.y += speedY;
    }
}
