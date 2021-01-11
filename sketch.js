// Daniel Shiffman
// https://thecodingtrain.com/
// https://youtu.be/Iaz9TqYWUmA

// Thanks to Veritasium
// https://youtu.be/zUyH3XhpLTo
// and Chris Orban / STEM Coding
// https://www.asc.ohio-state.edu/orban.14/stemcoding/blackhole.html

// Accounting for relativity:
// https://editor.p5js.org/codingtrain/sketches/4DvaeH0Ur

const c = 30;
const G = 2;
const dt = 0.1;
const period = 50;
const error = 2.1;
const numstars = 1;

let m87;
let star1;

const particles = [];
const stars = [];
let start, end;

function setup() {
  createCanvas(windowWidth, windowHeight);
  m87 = new Blackhole(width / 2, height / 2, 10000);

  start = height / 2;
  end = height / 2 - m87.rs * 2.6;

  for (let y = 0; y < start; y += 10) {
    particles.push(new Photon(width - 20, y, -c, 0));
  }
  
  stars.push(new Star(50, 50, 10, 5, 0));
  
  for (let j = 0; j < numstars; j++) {
    let vsx = Math.floor(Math.random() * c);
    let vsy = Math.floor(Math.random() * Math.sqrt((c * c) - (vsx * vsx)));
    stars.push(new Star(Math.floor(Math.random() * width), Math.floor(Math.random() * height), Math.floor(Math.random() * 10), vsx, vsy));
  }
}

let i = 0;

function draw() {
  background(255);

  stroke(0);
  strokeWeight(1);
  line(0, start, width, start);
  line(0, end, width, end);
  
  if (i === period) {
    for (let s of stars) {
     particles.push(new Photon(s.position.x + s.radius, s.position.y, c, 0));
     particles.push(new Photon(s.position.x - s.radius,s.position.y, -c, 0));
     particles.push(new Photon(s.position.x, s.position.y + s.radius, 0, c));
     particles.push(new Photon(s.position.x, s.position.y - s.radius, 0, -c));
    }
    i = 0;
  } else {
    i++;
  }
  for (let p of particles) {
    m87.pull(p);
    p.update();
    p.show();
  }
  for (let q of stars) {
  m87.attract(q);
  q.move();
  q.show();
  }
  m87.show();
}
