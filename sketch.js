let txt = []; 
let charIndex = 0; 
let particles = []; 
let img;
let insideImg;
let circleX, circleY, circleDiameter;
let gif;

function preload() {
  loadStrings('5.txt', function(data) {
    txt = loadStrings('5.txt');
  });
  img = loadImage('a5.png'); 
  gif = loadImage('z1.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  textSize(windowWidth < 500 ? 16 : 28); 
  fill(0);

   // 圆的中心坐标和半径
   circleX = width * 0.55;
   circleY = height * 0.7;
   circleDiameter = 580;
   
}

function draw() {
  background(200);
  

  let imageSize = circleDiameter * 0.6; 
  image(gif, circleX - imageSize / 2, circleY - imageSize / 2, imageSize, imageSize);
  
  
  let particlesInCircle = 0;
  for (let i = particles.length - 1; i >= 0; i--) {
    let d = dist(circleX, circleY, particles[i].position.x, particles[i].position.y);
    if (d < circleDiameter / 2) {
      particlesInCircle++;
    }

    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

 

  let screenRatio = width / height;
  let imgRatio = img.width / img.height;
  let drawWidth, drawHeight;
  if (imgRatio > screenRatio) {
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
  } else {
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
  }
  image(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(windowWidth < 500 ? 16 : 28); 
}

function mouseMoved() {
  addParticle(); 
  return false; 
}

function touchMoved() {
  addParticle(); 
  return false; 
}

function addParticle() {
  let line = txt[charIndex % txt.length]; 
  particles.push(new Particle(mouseX, mouseY, line));
  charIndex++; 
}

function displayImage() {
  let screenRatio = width / height;
  let imgRatio = img.width / img.height;
  let drawWidth, drawHeight;
  if (imgRatio > screenRatio) {
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
  } else {
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
  }
  image(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

class Particle {
  constructor(x, y, char) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.lifespan = 255; 
    this.char = char;

    this.size = windowWidth < 500 ? 16 : 28; 
  }

  update() {
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.lifespan -= 0.8;
    if (this.lifespan < 50 && this.velocity.mag() > 0.1) {
      this.velocity.mult(0.7);
    }
  }

  display() {
    fill(255,239,102, this.lifespan);
    textSize(this.size); 
    text(this.char, this.position.x, this.position.y);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}