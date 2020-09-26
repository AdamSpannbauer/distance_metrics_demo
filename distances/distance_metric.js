/**
 * Base class for distance metrics/drawings.
 */

function draw_text(text_arr, x, y) {
  let xi = x;

  for (let i = 0; i < text_arr.length; i++) {
    const text_part = text_arr[i];
    const t = text_part[0];
    const c = text_part[1];
    const w = textWidth(t);

    fill(c);
    stroke(c);
    text(t, xi, y);
    xi += w;
  }
}

class DistanceMetric {
  /*eslint-disable */
  // eslint was making it be really vertically spaced out
  // i didnt like it
  static dist_name = 'Distance Metric Base Class';
  
  #p1 = createVector();
  #p2 = createVector();
  #p3 = createVector();

  // Using plotly color palette:
  // import plotly.express as px
  // print(px.colors.qualitative.Plotly[:6])
  #p1_fill = color('#636EFA');
  #p2_fill = color('#EF553B');
  #p3_fill = color('#00CC96');

  #l1_stroke = color('#AB63FA');
  #l2_stroke = color('#FFA15A');
  #l3_stroke = color('#19D3F3');

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

  distance(p1, p2) {
    // Subclasses need to implement
  }

  draw_pair(p1, p2, d, p1_fill, p2_fill, l_stroke) {
    // Subclasses need to implement
  }

  mid_point_text(p1, p2, t, c) {
    const mip_point = createVector((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);

    push();
    c.setAlpha(255);
    fill(c);
    strokeWeight(0.5);

    translate(p1);
    text(t, mip_point.x + 10, mip_point.y + 20);
    pop();
  }

  draw() {
    push();
    // Assume center of canvas is at location (0, 0)

    // Always draw p1 <-> p2
    this.draw_pair(this.#p1, this.#p2, this.d12, this.#p1_fill, this.#p2_fill, this.#l1_stroke);

    // Optionally draw p3 relationships
    if (this.use_p3) {
      this.draw_pair(this.#p1, this.#p3, this.d13, this.#p1_fill, this.#p3_fill, this.#l2_stroke);
      this.draw_pair(this.#p2, this.#p3, this.d23, this.#p2_fill, this.#p3_fill, this.#l3_stroke);

      this.triangle_inequality_text();
    } else {
      this.distance_comparison_text();
    }
    pop();
  }

  distance_comparison_text() {
    strokeWeight(1);
    stroke(0);
    fill(0);

    const buffer = 13;
    const x = -width / 2 + 2;
    let y = -height / 2 + buffer;

    const euclid = dist(this.#p1.x, this.#p1.y, this.#p2.x, this.#p2.y);
    const manhattan = abs(this.#p1.x - this.#p2.x) + abs(this.#p1.y - this.#p2.y);
    const cheby = max([abs(this.#p1.x - this.#p2.x), abs(this.#p1.y - this.#p2.y)]);

    text(`Euclidean: ${euclid.toFixed(1)}`, x, y);
    y += buffer;
    text(`Manhattan: ${manhattan.toFixed(1)}`, x, y);
    y += buffer;
    text(`Chebyshev: ${cheby.toFixed(1)}`, x, y);
    y += buffer;
  }

  triangle_inequality_text() {
    strokeWeight(1);
    stroke(0);
    fill(0);

    const buffer = 13;
    const x = -width / 2 + 2;
    let y = -height / 2 + buffer;
    let text_arr;

    text('Triangle inequality:', x, y);
    y += buffer;

    text_arr = [
      [`${this.d12.toFixed(1)}`, this.#l1_stroke],
      [' + ', (0, 0, 0)],
      [`${this.d13.toFixed(1)}`, this.#l2_stroke],
      [` = ${(this.d12 + this.d13).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3_stroke],
    ];
    draw_text(text_arr, x, y);
    y += buffer;

    text_arr = [
      [`${this.d12.toFixed(1)}`, this.#l1_stroke],
      [' + ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3_stroke],
      [` = ${(this.d12 + this.d23).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d12.toFixed(1)}`, this.#l2_stroke],
    ];
    draw_text(text_arr, x, y);
    y += buffer;

    text_arr = [
      [`${this.d13.toFixed(1)}`, this.#l2_stroke],
      [' + ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3_stroke],
      [` = ${(this.d13 + this.d23).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l1_stroke],
    ];
    draw_text(text_arr, x, y);
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
