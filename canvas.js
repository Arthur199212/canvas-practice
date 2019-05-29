const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const mouse = {
  x: 0,
  y: 0
}

document.body.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})


// All balls in array
let circlesArray = [];

// Class for balls
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius;
    this.colors = ['#2B3D4F', '#E84E3C', '#F2FAFF', '#3599DB', '#34495E'];
    this.color = Math.floor(Math.random() * this.colors.length);
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colors[this.color];
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      this.radius >= this.maxRadius ? this.radius = this.maxRadius : this.radius += 2;
    } else {
      this.radius <= this.minRadius ? this.radius = this.minRadius : this.radius -= 2;
    }

    this.draw();
  }
}

function init() {
  circlesArray = [];

  // For creating N balls
  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * 3 + 2;

    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;

    const multiplyVelocity = 2;

    let dx = (Math.random() - 0.5) * multiplyVelocity;
    let dy = (Math.random() - 0.5) * multiplyVelocity;

    circlesArray.push(new Circle(x, y, dx, dy, radius));
  }
}

// Animate balls
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  // const colors = ['#2B3D4F', '#E84E3C', '#F2FAFF', '#3599DB', '#34495E'];
  // let count = Math.floor(Math.random() * colors.length);

  for (let i = 0; i < circlesArray.length; i++) {
    // circlesArray[i].draw();
    circlesArray[i].update();
  };
}

init();
animate();
