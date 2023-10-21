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
    clearBloodStains: function () {
        this.bloodStains = []
    },
    bloodStains: [],
    bloodImage: new Image(),
    score: 0,
    zombieSpeed: 2,
    zombieCount: 0,
    
    init: function () {
        const canvas = document.querySelector('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvasW = canvas.width = innerWidth;
        this.canvasH = canvas.height = innerHeight;
        this.reset();
        
        this.zombieCount = 1;

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
            
            this.player.img.src='assets/player_shoot.png'
            this.player.frames = 3
            this.player.frameIndex = 0
            this.player.frameCounter = 0; 
            this.player.w = 100;
            this.player.h = 100;
            
            setTimeout(() => {
                this.player.img.src = 'assets/player_1linea.png';
                this.player.frames = 40; 
            }, 60);
           

       
            
              
			
		})
        this.bloodImage.src = 'assets/sangre.png';
    },

    reset: function () {
        this.background = new Background(this.ctx, this.canvasW, this.canvasH);
        this.player = new player(this.ctx, this.canvasW, this.canvasH, this.keys);
        this.zombie = [];
        this.start();
    },

    generateZombie: function () {
    const spawnSide = Math.floor(Math.random() * 4);
    let startX, startY;

    if (this.score >= 100 && this.score % 100 === 0) {
        this.zombieCount += 0.1; 
    }

    for (let i = 0; i < this.zombieCount; i++) {
        // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
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

        this.zombie.push(new zombie(this.ctx, this.canvasW, this.canvasH, startX, startY, this.zombieSpeed));
    }
},


    start: function () {
        this.frameCounter = 0;
        this.intervalId = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

            this.background.draw();
            this.drawBloodStains()
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
                
                
                
                
                );
                
           
            this.ZombieCollisions();
            this.handlePlayerZombieCollisions()
            
            if (this.frameCounter % 100 === 0) {
                this.generateZombie();
            }
            
            this.clearZombie();
            

            //BUUGGGGGGGGG
            // if (this.isCollision()) {
            //     this.gameOver();
            // }

            
            this.drawScore()

            this.frameCounter++;
        }, 1000 / this.fps);
    },
    ZombieCollisions: function () {
        this.bullets.forEach((bullet) => {
            if (!bullet.hit) {
                this.zombie.forEach((zombie, zombieIndex) => {
                    if (bullet.checkCollisionWithZombie(zombie)) {
                        bullet.hit = true;
                        zombie.life--; 
                        console.log(zombie); 

                        this.bloodStains.push({ x: zombie.x, y: zombie.y });
                        this.zombie.splice(zombieIndex, 1);

                        const bulletImpactSound = document.getElementById("bulletImpactSound");
                        bulletImpactSound.play();
    
                        if (zombie.life <= 0) {
                            this.zombie.splice(zombieIndex, 0);
                            this.zombie.splice(zombieIndex, 0); 
                            this.score += 10;
    
                            const zombieImpactSound = document.getElementById("zombieImpactSound");
                            zombieImpactSound.play();
                        }

                        if (this.score >= 100 && this.score % 100 === 0) {
                            this.zombieSpeed += 0.5; 
                            
                        }
                        
                    }

                    
                });
            }
             
        });
    
        this.bullets = this.bullets.filter((bullet) => !bullet.hit);
    },

    checkCollisionWithPlayer: function(zombie, player) {
        
        const playerLeft = player.x+50;
        const playerRight = player.x + player.w;
        const playerTop = player.y+50;
        const playerBottom = player.y + player.h;
    
        const zombieLeft = zombie.x+30;
        const zombieRight = zombie.x + zombie.w;
        const zombieTop = zombie.y+50;
        const zombieBottom = zombie.y + zombie.h;
    
       
        if (
            playerLeft < zombieRight &&
            playerRight > zombieLeft &&
            playerTop < zombieBottom &&
            playerBottom > zombieTop
        ) {
            return true;
        }
    
        return false;
    },

    handlePlayerZombieCollisions: function () {
        this.zombie.forEach((zombie, index) => {
            if (this.checkCollisionWithPlayer(zombie, this.player)) {
                this.player.life--; 
                this.zombie.splice(index, 0); 
                const muerto = document.getElementById("dead");
                        muerto.play();
                if (this.player.life <= 0) {
                   
                    this.gameOver();
                }
            }
        });
    },
    
    drawBloodStains: function () {
        this.bloodStains.forEach((stain) => {
            const bloodImage = new Image();
            bloodImage.src = 'assets/sangre.png';
            
            this.ctx.drawImage(this.bloodImage, stain.x, stain.y);
        });
    },



    drawScore: function () {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Puntuación: ${this.score}`, 10, 30);
    },




    

   gameOver: function () {
    clearInterval(this.intervalId);
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = "";
    
    
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.pause();

    
    const gameOverMusic = document.getElementById("game-over-music");
    gameOverMusic.play();
    
    if (confirm(`         GAME OVER!!!
    puntuación final: ${this.score}
    ¿Deseas volver a jugar?`)) {
        this.clearBloodStains();
        this.score = 0;
        this.zombieCount = 1;
        this.zombieSpeed = 2;
        const gameOverScreen= document.getElementById('game-over-screen')
        gameOverScreen.style.display = ""
        
    }
},

    
    
    
    
    
    clearZombie: function () {
        this.zombie = this.zombie.filter((zombie) => zombie.x + zombie.w > 0);
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    },
};