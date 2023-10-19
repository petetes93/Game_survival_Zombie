const Game = {
    ctx: undefined,
    canvasW: undefined,
    canvasH: undefined,
    fps: 60,
    
    keys: {
        RIGHT: 'KeyD',
        LEFT: 'KeyA',
        UP: 'KeyW',
        DOWN: 'KeyS',
        
    },
    
    bullets: [],
    
    init: function () {
        const canvas = document.querySelector('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvasW = canvas.width = innerWidth;
        this.canvasH = canvas.height = innerHeight;
        this.reset();
        
        
        canvas.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            const dx = mouseX-60 - this.player.x;
            const dy = mouseY-30 - this.player.y;
            
            
            this.player.direction = Math.atan2(dy, dx);
            
        
        });
        const shootSound = document.getElementById("shootSound");
    	canvas.addEventListener('click', (event) => {
			const x = event.clientX;
            const y = event.clientY;
            
            
            shootSound.pause();
            shootSound.currentTime = 0;
            shootSound.play(); 

		
              this.bullets.push(new Bullet(this.ctx, this.player.x + this.player.w / 2, this.player.y + this.player.h / 2, x, y));
            
              
			console.log('disparo');
			
		})
        
    },

    reset: function () {
        this.background = new Background(this.ctx, this.canvasW, this.canvasH);
        this.player = new player(this.ctx, this.canvasW, this.canvasH, this.keys);
        this.zombie = [];
        this.start();
    },

    generateZombie: function () {
    
        const spawnSide = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
        let startX, startY;
    
        switch (spawnSide) {
            case 0: 
                startX = Math.random() * this.canvasW;
                startY = -100;
                break;
            case 1: 
                startX = this.canvasW + 100;
                startY = Math.random() * this.canvasH;
                break;
            case 2: 
                startX = Math.random() * this.canvasW;
                startY = this.canvasH + 100;
                break;
            case 3: 
                startX = -100;
                startY = Math.random() * this.canvasH;
                break;
        }
    
        this.zombie.push(new zombie(this.ctx, this.canvasW, this.canvasH, startX, startY));
    },

    start: function () {
        this.frameCounter = 0;
        this.intervalId = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

            this.background.draw();
            
            this.player.draw();
            this.player.move();

            
            this.zombie.forEach((zombie, index) => {
                zombie.animateSprite(); 
                zombie.move(this.player.x, this.player.y);
                zombie.draw();
            },

            this.bullets = this.bullets.filter((bullet) => bullet.x + bullet.radius > 0 && bullet.x - bullet.radius < this.canvasW && bullet.y + bullet.radius > 0 && bullet.y - bullet.radius < this.canvasH),

                
            this.bullets.forEach((bullet) => {
                    console.log(bullet);
                    bullet.draw()
                    bullet.move()
                }),
                
        
        
                console.log(this.bullets)
            );

            this.ZombieCollisions();
            
            if (this.frameCounter % 200 === 0) {
                this.generateZombie();
            }
            
            this.clearZombie();
            // if (this.isCollision()) {
            //     this.gameOver();
            // }


            // this.drawScoreboard(); 

            this.frameCounter++;
        }, 1000 / this.fps);
    },
    ZombieCollisions: function () {
        this.bullets.forEach((bullet) => {
            if (!bullet.hit) {
                this.zombie.forEach((zombie, zombieIndex) => {
                    if (bullet.checkCollisionWithZombie(zombie)) {
                        bullet.hit = true;
                        this.zombie.splice(zombieIndex, 1);
                       
                          
                    const bulletImpactSound = document.getElementById("bulletImpactSound");
                    bulletImpactSound.play();

                    
                    const zombieImpactSound = document.getElementById("zombieImpactSound");
                    zombieImpactSound.play();
                    }
                });
            }
        });
    
        this.bullets = this.bullets.filter((bullet) => !bullet.hit);
    },
    

      
    
	// gameOver: function () {
	// 	clearInterval(this.intervalId);
	// 	alert(`GAME OVER! Puntuación final: ${this.score}`); 
	
	// 	this.score = 0; 
	
	// 	if (confirm('¿Volver a jugar?')) {
	// 		this.reset();
	// 	}
	// },

   

    // drawScoreboard: function () {
    //     this.ctx.fillStyle = 'black';
    //     this.ctx.fillRect(0, 0, this.canvasW, 50);
    //     this.ctx.fillStyle = 'yellow';
    //     this.ctx.font = '24px Arial';
    //     this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    // },

    clearZombie: function () {
        this.zombie = this.zombie.filter((zombie) => zombie.x + zombie.w > 0);
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    },
};