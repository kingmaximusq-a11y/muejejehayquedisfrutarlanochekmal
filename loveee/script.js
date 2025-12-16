const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 🎥 Resolución Reel
canvas.width = 1080;
canvas.height = 1920;

const particles = [];
const colors = ["#ff4d6d", "#ff758f", "#ffb3c6", "#ffd6e0"];

class HeartParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 6;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedY = Math.random() * 0.4;
  }

  drawHeart() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x - this.size, this.y - this.size,
      this.x - this.size * 2, this.y + this.size,
      this.x, this.y + this.size * 2
    );
    ctx.bezierCurveTo(
      this.x + this.size * 2, this.y + this.size,
      this.x + this.size, this.y - this.size,
      this.x, this.y
    );
    ctx.fill();
  }

  update() {
    this.y += this.speedY;
    this.drawHeart();
  }
}

/* 💗 Forma matemática del corazón */
function heartShape(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

/* 🌸 Copa del árbol */
function createHeartTree() {
  const scale = 18;
  const centerX = canvas.width / 2;
  const centerY = 700;

  for (let t = 0; t < Math.PI * 2; t += 0.035) {
    const pos = heartShape(t);
    const x = centerX + pos.x * scale;
    const y = centerY - pos.y * scale;

    particles.push(new HeartParticle(x, y));
  }
}

/* 🌳 Tronco */
function drawTrunk() {
  ctx.fillStyle = "#4a7c59";
  ctx.fillRect(canvas.width / 2 - 22, 950, 44, 260);
}

/* 🎬 Animación */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTrunk();
  particles.forEach(p => p.update());

  requestAnimationFrame(animate);
}

createHeartTree();
animate();