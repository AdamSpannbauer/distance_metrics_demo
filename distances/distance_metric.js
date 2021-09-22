/**
 * Base class for distance metrics/drawings.
 */

import {
  chebyshevDist, cosineDist, euclideanDist, manhattanDist,
} from './baseDistFuncs.js';
import { drawText } from './utils.js';

export class DistanceMetric {
  /*eslint-disable */
  // eslint was making it be really vertically spaced out; i didnt like it
  static dist_name = 'Distance Metric Base Class';
  
  #p1 = createVector();
  #p2 = createVector();
  #p3 = createVector();

  // Using plotly color palette (https://plotly.com/):
  // >>> import plotly.express as px
  // >>> print(px.colors.qualitative.Plotly[:6])
  #p1Fill = color('#636EFA');
  #p2Fill = color('#EF553B');
  #p3Fill = color('#00CC96');

  #l1Stroke = color('#AB63FA');
  #l2Stroke = color('#FFA15A');
  #l3Stroke = color('#19D3F3');

  useP3 = false;

  d12 = 0;
  d13 = 0;
  d23 = 0;
  /* eslint-enable */

  constructor(p1, p2, p3 = null) {
    if (p1 === null || p2 === null) return;
    this.#p1.set(p1.x, p1.y);
    this.#p2.set(p2.x, p2.y);

    if (p3 !== null) {
      this.useP3 = true;
      this.#p3.set(p1.x, p1.y);
    } else {
      this.useP3 = false;
    }
  }

  // eslint-disable-next-line no-unused-vars
  distance(p1, p2) {
    // Subclasses need to implement
  }

  // eslint-disable-next-line no-unused-vars
  drawPair(p1, p2, d, p1Fill, p2Fill, strokeColor) {
    // Subclasses need to implement
  }

  draw() {
    const {
      p1, p2, d12, p1Fill, p2Fill, l1Stroke,
    } = this;

    push();
    // Always draw p1 <-> p2
    this.drawPair(p1, p2, d12, p1Fill, p2Fill, l1Stroke);

    // Optionally draw p3 relationships
    if (this.useP3) {
      const {
        p3, d13, d23, p3Fill, l2Stroke, l3Stroke,
      } = this;

      this.drawPair(p1, p3, d13, p1Fill, p3Fill, l2Stroke);
      this.drawPair(p2, p3, d23, p2Fill, p3Fill, l3Stroke);

      this.drawTriangleIneqText();
    } else {
      this.drawDistCompareText();
      this.drawP1P2CoordsText();
    }
    pop();
  }

  drawP1P2CoordsText() {
    const {
      p1, p2, p1Fill, p2Fill,
    } = this;

    push();
    textSize(9);
    strokeWeight(1);

    stroke(p1Fill);
    fill(p1Fill);
    text(`(${p1.x.toFixed(1)}, ${-1 * p1.y.toFixed(1)})`, p1.x + 5, p1.y + 5);

    stroke(p2Fill);
    fill(p2Fill);
    text(`(${p2.x.toFixed(1)}, ${-1 * p2.y.toFixed(1)})`, p2.x + 5, p2.y + 5);
    pop();
  }

  drawDistCompareText() {
    const { p1, p2 } = this;
    strokeWeight(1);
    stroke(0);
    fill(0);

    const buffer = 13;
    const x = -width / 2 + 2;
    let y = -height / 2 + buffer;

    const compareDists = [
      { label: 'Euclidean', d: euclideanDist(p1, p2) },
      { label: 'Manhattan', d: manhattanDist(p1, p2) },
      { label: 'Chebyshev', d: chebyshevDist(p1, p2) },
      { label: 'Cosine', d: cosineDist(p1, p2) },
    ];

    compareDists.forEach(({ label, d }) => {
      text(`${label}: ${d.toFixed(2)}`, x, y);
      y += buffer;
    });
  }

  drawTriangleIneqText() {
    strokeWeight(1);
    stroke(0);
    fill(0);

    const buffer = 13;
    const x = -width / 2 + 2;
    let y = -height / 2 + buffer;
    let textArr;

    text('Triangle inequality:', x, y);
    y += buffer;

    textArr = [
      [`${this.d12.toFixed(1)}`, this.#l1Stroke],
      [' + ', (0, 0, 0)],
      [`${this.d13.toFixed(1)}`, this.#l2Stroke],
      [` = ${(this.d12 + this.d13).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3Stroke],
    ];

    drawText(textArr, x, y);
    y += buffer;

    textArr = [
      [`${this.d12.toFixed(1)}`, this.#l1Stroke],
      [' + ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3Stroke],
      [` = ${(this.d12 + this.d23).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d12.toFixed(1)}`, this.#l2Stroke],
    ];
    drawText(textArr, x, y);
    y += buffer;

    textArr = [
      [`${this.d13.toFixed(1)}`, this.#l2Stroke],
      [' + ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l3Stroke],
      [` = ${(this.d13 + this.d23).toFixed(1)}`, (0, 0, 0)],
      [' >= ', (0, 0, 0)],
      [`${this.d23.toFixed(1)}`, this.#l1Stroke],
    ];
    drawText(textArr, x, y);
  }

  get p1Fill() {
    return this.#p1Fill;
  }

  get p2Fill() {
    return this.#p2Fill;
  }

  get p3Fill() {
    return this.#p3Fill;
  }

  get l1Stroke() {
    return this.#l1Stroke;
  }

  get l2Stroke() {
    return this.#l2Stroke;
  }

  get l3Stroke() {
    return this.#l3Stroke;
  }

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
    if (!p) {
      this.useP3 = false;
      return;
    }

    // Only do stuff if it changed
    if (!p.equals(this.#p3)) {
      this.useP3 = true;
      this.#p3.set(p.x, p.y);

      this.d13 = this.distance(this.#p1, this.#p3);
      this.d23 = this.distance(this.#p2, this.#p3);
    }
  }
}
