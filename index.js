window.addEventListener('load', () => {
	
    const startSound = document.getElementById("intro");
    const startButton = document.getElementById("start-button");
    const backgroundMusic = document.getElementById("background-music"); 
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartButton = document.getElementById('restart-button');
    const gameovermusic = document.getElementById("game-over-music"); 
	
	startSound.volume = 0.7
	backgroundMusic.volume = 0.5
	gameovermusic.volume = 0.5
    startSound.play();
	

    startButton.addEventListener('click', function() {
        this.style.display = 'none';
        startSound.pause();
        backgroundMusic.play(); 
        Game.init();
    });

    restartButton.addEventListener('click', function() {
        gameOverScreen.style.display = "none";
        gameovermusic.play(); 
        backgroundMusic.pause(); 
        Game.reset();
    });

});

