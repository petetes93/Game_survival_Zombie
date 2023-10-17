class zombie {
    constructor(ctx, canvasW, canvasH, startX, startY) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.w = 120;
        this.h = 120;
        this.img = new Image();
        this.img.src = 'assets/zombie.png';
        this.x = startX; // Posición inicial aleatoria
        this.y = startY; // Posición inicial aleatoria
        this.speed = 2; // Velocidad del zombie

        this.frames = 17;
        this.frameIndex = 0;
        this.frameCounter = 0;
    }
	// getCollisionRect() {
       
    //     return {
    //         x: this.x,
    //         y: this.y,
    //         width: this.w-50,
    //         height: this.h-119.5,
    //     };
    // }
    draw() {
        this.frameWidth = this.img.width / this.frames;
		this.frameHeight = this.img.height;
	
        this.ctx.save(); // Guarda el contexto
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2); // Translada al centro del sprite
        this.ctx.rotate(this.direction); // Rota el sprite hacia la dirección del jugador
    
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
    
        // Ajusta la dirección del zombie para que mire al jugador
        this.direction = angle;
    
        // Calcula la velocidad en función de la dirección y la velocidad del zombie
        const speedX = Math.cos(angle) * this.speed;
        const speedY = Math.sin(angle) * this.speed;
    
        this.x += speedX;
        this.y += speedY;
    }
}
