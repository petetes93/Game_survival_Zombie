class Bullet {
    constructor(ctx, bulletX, bulletY, clientX, clientY) {
        this.ctx = ctx;
        this.clientX= clientX
        this.clientY= clientY
        this.radius = 20;
        this.x = bulletX;
        this.y = bulletY;

        // Velocidad de la bala
        this.vx = 1; // Ajusta esto según la velocidad deseada
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.closePath();
        console.log(this.x);
    }

    move() {
        // Mover la bala hacia adelante
        if (this.x < this.clientX) {
            this.x = this.x + this.vx
        }
        if (this.x < this.clientX) {
            this.x = this.x + this.vx
        }
        if (this.x < this.clientX) {
            this.x = this.x + this.vx
        }
        if (this.x < this.clientX) {
            this.x = this.x + this.vx
        }

    }
}


