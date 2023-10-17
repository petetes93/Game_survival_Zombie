class player {
	constructor(ctx, canvasW, canvasH, keys) {
		window.playerImg = new Image();
        playerImg.src = "assets/player_edit.png";
		playerImg.onload = ()=>{
			this.w = 120,
			this.h = 90
			this.img = playerImg
		}
		this.ctx = ctx;
		this.canvasW = innerWidth;
		this.canvasH = innerHeight;
		this.keys = keys;
        this.direction = Math.PI/2;
		
		this.x = canvasW /2;
		this.y = canvasH /2;
		this.vx = 10;
        this.vy = 10
		this.actions = {
			right: false,
			left: false,
            up: false,
            down: false,
		};
		this.frameIndex = 0;
		this.frames = 20;
	


		this.frameCounter = 0;
		this.setControls();
	}

	setControls() {
		document.addEventListener('click', (event) => {
			const x = event.clientX;
  			const y = event.clientY;
			//   playerImg.src = "assets/muzzle_flash_01.png";
			console.log(event);
			
		})
		document.addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys.RIGHT:
					this.actions.right = true;
					break;

				case this.keys.LEFT:
					this.actions.left = true;
					break;

                case this.keys.UP:
                    this.actions.up = true;
                
                    break;

                case this.keys.DOWN:
                    this.actions.down = true;
                
                    break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch (event.code) {

				case this.keys.RIGHT:
					this.actions.right = false;
                    console.log('D');

					break;

				case this.keys.LEFT:
					this.actions.left = false;
                    console.log('A');
					break;

                case this.keys.UP:
                    this.actions.up = false;
                console.log('W');
                     break;

                case this.keys.DOWN:
                     this.actions.down = false;
                    console.log('S');
                     break;
			}
		});
	}

	draw() {
        this.frameWidth = this.img.width / this.frames;
        this.frameHeight = this.img.height / 2;

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
            this.h
        );
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

	getCollisionRect() {
        
        return {
            x: this.x ,
            y: this.y ,
            width: this.w-70,
            height: this.h -119.5,
        };
    }

	move() {
        this.animateSprite();
    
        if (this.actions.right) {
            if (this.x + this.w < innerWidth) {
                this.x += this.vx;
            }
        }
    
        if (this.actions.left) {
            if (this.x > 0) {
                this.x -= this.vx;
            }
        }
    
        if (this.actions.up) {
            if (this.y > 0) {
                this.y -= this.vy;
            }
        }
    
        if (this.actions.down) {
            if (this.y + this.h < innerHeight) {
                this.y += this.vy;
            }
        }
		
        
    }
}
