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
        
        // Agrega el evento de mousemove aquí
        canvas.addEventListener('mousemove', (event) => {
            this.player.draw(event);
        });
    },

    reset: function () {
        // this.background = new Background(this.ctx, this.canvasW, this.canvasH);
        this.player = new player(this.ctx, this.canvasW, this.canvasH, this.keys);
        // this.obstacles = [];
        this.start();
    },

    // generateObstacle: function () {
    //     this.obstacles.push(
    //         new Obstacle(this.ctx, this.canvasW, this.canvasH, this.player.h)
    //     );
    // },

    start: function () {
        this.frameCounter = 0;
        this.intervalId = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
            // this.background.draw();
        
            this.player.draw();
            this.player.move();
            // this.obstacles.forEach((obstacle, index) => {
            //     obstacle.move();
            //     obstacle.draw();

            //     if (obstacle.y > this.player.y + this.player.h) {
                    
            //         this.score += 1;
            //         this.obstacles.splice(index, 1); 
            //     }
            // });

            // if (this.frameCounter % 100 === 0) {
            //     this.generateObstacle();
            // }

            // if (this.isCollision()) {
            //     this.gameOver();
            // }

            // this.clearObstacles();

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

   

    drawScoreboard: function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvasW, 50);
        this.ctx.fillStyle = 'yellow';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    },

    // clearObstacles: function () {
    //     this.obstacles = this.obstacles.filter(
    //         (obstacle) => obstacle.x + obstacle.w > 0
    //     );
    // },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    },
};
