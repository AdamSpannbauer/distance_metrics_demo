/**
 * Base class for distance metrics/drawings.
 */

class DistanceMetric {
  /*eslint-disable */
  // eslint was making it be really vertically spaced out
  // i didnt like it
  name = 'Distance Metric Base Class';
  
  #p1 = createVector();
  #p2 = createVector();
  #p3 = createVector();
  use_p3 = false;

  d12 = 0;
  d13 = 0;
  d23 = 0;
  /* eslint-enable */

  constructor(p1, p2, p3) {
    // Needs both p1 and p2
    if (p1) {
      this.#p1.set(p1.x, p1.y);
    }

    if (p1 && p2) {
      this.#p2.set(p2.x, p2.y);
    }

    // Ignore missing p3
    if (p1 && p2 && p3) {
      this.use_p3 = true;
      this.#p3.set(p1.x, p1.y);
    }
  }

  distance() {
    // TODO: implement distance calc here
    return dist(this.#p1.x, this.#p1.y, this.#p2.x, this.#p2.y);
  }

  #draw_pair (p1, p2, d) {
    // TODO: implement code to draw a pair of points/vectors
    // given 2 x, y vectors and a distance
    ellipse(p1.x, p1.y, 6, 6);
    ellipse(p2.x, p2.y, 6, 6);
    this.#mid_point_text(p1, p2, d.toFixed(3))
  }

  #mid_point_text (p1, p2, t) {
    const mip_point = createVector((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);

    push();

    strokeWeight(0.5);
    stroke(250);
    fill(250);

    translate(p1);
    text(t, mip_point.x + 10, mip_point.y + 20);

    pop();
  }

  draw() {
    push();
    // Assume center of canvas is at location (0, 0)

    // Always draw p1 <-> p2
    this.#draw_pair(this.#p1, this.#p2, this.d12);

    // Optionally draw p3 relationships
    if (this.use_p3) {
      this.#draw_pair(this.#p1, this.#p3, this.d13);
      this.#draw_pair(this.#p2, this.#p3, this.d23);
    }
    pop();
  }

  // getters/setters for p1, p2, & p3
  get p1() {
    return this.#p1;
  }

  get p2() {
    return this.#p2;
  }

  get p3() {
    return this.#p3;
  }

  set p1(p) {
    // Only do stuff if it changed
    if (!p.equals(this.#p1)) {
      this.#p1.set(p.x, p.y);

      this.d12 = this.distance(this.#p1, this.#p2);
      this.d13 = this.distance(this.#p1, this.#p3);
    }
  }

  set p2(p) {
    // Only do stuff if it changed
    if (!p.equals(this.#p2)) {
      this.#p2.set(p.x, p.y);

      this.d12 = this.distance(this.#p1, this.#p2);
      this.d23 = this.distance(this.#p2, this.#p3);
    }
  }

  set p3(p) {
    // Set flag to draw whether its null or not
    if (!p) {
      this.use_p3 = false;
    } else {
      this.use_p3 = true;

      // Only do stuff if it changed
      if (!p.equals(this.#p2)) {
        this.use_p3 = true;
        this.#p3.set(p.x, p.y);

        this.d13 = this.distance(this.#p1, this.#p3);
        this.d23 = this.distance(this.#p2, this.#p3);
      }
    }
  }
}

export default DistanceMetric;
