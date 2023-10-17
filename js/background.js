class Background {
	constructor(ctx, canvasW, canvasH) {
		this.ctx = ctx;
		this.canvasW = canvasW;
		this.canvasH = canvasH;
		this.img = new Image();
		this.img.src = 'assets/Captura de pantalla 2023-10-17 150213.png';
	}

	draw() {
		this.ctx.drawImage(this.img, 0, 0, this.canvasW, this.canvasH);
	}
}