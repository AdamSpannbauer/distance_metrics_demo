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
    this.#p1.set(p1.x, p1.y);
    this.#p2.set(p2.x, p2.y);

    // Assumes symmetric distance
    this.d12 = this.distance(this.#p1, this.#p2);

    // Ignore missing p3
    if (p3) {
      this.use_p3 = true;
      this.#p3.set(p1.x, p1.y);

      this.d13 = this.distance(this.#p1, this.#p3);
      this.d23 = this.distance(this.#p2, this.#p3);
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
    this.#p1.set(p.x, p.y);

    this.d12 = this.distance(this.#p1, this.#p2);
    this.d13 = this.distance(this.#p1, this.#p3);
  }

  set p2(p) {
    this.#p2.set(p.x, p.y);

    this.d12 = this.distance(this.#p1, this.#p2);
    this.d23 = this.distance(this.#p2, this.#p3);
  }

  set p3(p) {
    this.use_p3 = true;
    this.#p3.set(p.x, p.y);

    this.d13 = this.distance(this.#p1, this.#p3);
    this.d23 = this.distance(this.#p2, this.#p3);
  }
}

export default DistanceMetric;
