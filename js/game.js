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
   
    
    init: function () {
        const canvas = document.querySelector('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvasW = canvas.width = innerWidth;
        this.canvasH = canvas.height = innerHeight;
        this.reset();
        
        
        canvas.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            const dx = mouseX - this.player.x;
            const dy = mouseY - this.player.y;
            
            this.player.direction = Math.atan2(dy, dx);
        });
        
    },

    reset: function () {
        this.background = new Background(this.ctx, this.canvasW, this.canvasH);
        this.player = new player(this.ctx, this.canvasW, this.canvasH, this.keys);
        // this.zombie = new zombie(this.ctx, this.canvasW, this.canvasH)
        this.zombie = [];
        this.start();
    },

    generateZombie: function () {
        this.zombie.push(
            new zombie(this.ctx, this.canvasW, this.canvasH)
        );
        this.zombie.push(
            new zombie(this.ctx, this.canvasW, this.canvasH)
        );
    },

    start: function () {
        this.frameCounter = 0;
        this.intervalId = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
            this.background.draw();
            
            this.player.draw();
            this.player.move();

            this.zombie.forEach((zombie, index) => {
                zombie.move();
                zombie.draw();




            
           // if (obstacle.y > this.player.y + this.player.h) {
                    
                //     this.score += 1;
                //     this.obstacles.splice(index, 1); 
                // }
            });

            if (this.frameCounter % 50 === 0) {
                this.generateZombie();
            }

            // if (this.isCollision()) {
            //     this.gameOver();
            // }

            this.clearZombie();

            // this.drawScoreboard(); 

            this.frameCounter++;
        }, 1000 / this.fps);
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
        this.zombie = this.zombie.filter(
            (zombie) => zombie.x + zombie.w > 0
        );
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    },
};
