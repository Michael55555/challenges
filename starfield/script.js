"use strict";
onload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas)
        throw new Error('Canvas element not found');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('Something is wrong with the canvas object');
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    new Starfield(ctx);
};
class Starfield {
    constructor(ctx) {
        this.ctx = ctx;
        this.stars = Array(100).fill(0).map(() => new Star(ctx));
        setInterval(() => {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, innerWidth, innerHeight);
            this.stars.forEach(star => star.flyAway());
        }, 100);
    }
}
class Star {
    constructor(ctx) {
        this.ctx = ctx;
        this.d = 1;
        this.z = Math.random() * innerWidth / 2;
        this.x = Math.random() * innerWidth;
        this.y = Math.random() * innerHeight;
        this.startX = 0;
        this.starY = 0;
    }
    flyAway() {
        if (this.z > innerWidth / 2 + 50)
            this.z = Math.random() * 50;
        this.startX = this.specifyPosition(this.x, this.y, this.z)[0];
        this.starY = this.specifyPosition(this.x, this.y, this.z)[1];
        this.z += this.d;
        this.drawShadow();
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(this.startX, this.starY, 5, 5);
    }
    drawShadow() {
        const shadows = (this.z / 30) % 40;
        for (let i = 0; i < shadows; i++) {
            this.ctx.fillStyle = `#555`;
            this.ctx.fillRect(this.specifyPosition(this.x, this.y, this.z - i)[0], this.specifyPosition(this.x, this.y, this.z - i)[1], 5, 5);
        }
    }
    specifyPosition(x, y, z) {
        return [Math.cos(x) * z + innerWidth / 2, Math.sin(y) * z + innerHeight / 2];
    }
}
