class zombie {
    constructor(ctx, canvasW, playerH, canvasH) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.w = 120;
        this.h = 90;
        this.img = new Image();
        this.img.src = 'assets/zombie.png';
        this.x = canvasW -1500;
        this.y =  canvasH-250; 
        this.dx = 5;
        this.dy = 5;
        this.frameIndex = 0;
		this.frames = 18;
	
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
	
		
		this.ctx.drawImage(
			this.img,
			this.frameIndex * this.frameWidth,
			0,
			this.frameWidth,
			this.frameHeight,
			this.x,
			this.y,
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
    move() {
        this.x += this.dx;
        this.y += this.dy;
        Math.floor(Math.random() * (canvasW - this.w)) * (canvasH - this.h)
        
    }
}
