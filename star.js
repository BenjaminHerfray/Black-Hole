class Star {
  constructor(x,y,r,vx,vy) {
    this.position = createVector(x,y);
    this.radius = r;
    this.velocity = createVector(vx, vy);
    this.stopped = false;
  }
  
  stop() {
    this.stopped = true;
  }
  
  move() {
      if (!this.stopped) {
        const dr = this.velocity.copy();
        dr.mult(dt);
        this.position.add(dr);
      }
  }
  
  show() {
    ellipseMode(RADIUS);
    fill(250, 200, 70);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius);
    
  }
  
}
