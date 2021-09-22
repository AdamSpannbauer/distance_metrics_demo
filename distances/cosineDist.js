import { cosineDist } from './baseDistFuncs.js';
import { DistanceMetric } from './distanceMetric.js';

export class CosineDistance extends DistanceMetric {
  static distName = '1 - Cosine Similarity';

  distance(p1, p2) {
    return cosineDist(p1, p2);
  }

  arcText(p1, p2, t, c, midPointVec) {
    midPointVec.setMag(20);

    push();
    c.setAlpha(255);
    fill(c);
    strokeWeight(0.5);

    translate(midPointVec);
    text(t, midPointVec.x, midPointVec.y);
    pop();
  }

  drawPair(p1, p2, d, p1Fill, p2Fill, strokeColor) {
    push();
    strokeColor.setAlpha(150);
    stroke(color('#636EFA'));
    // draw each vector
    line(0, 0, p1.x, p1.y);
    line(0, 0, p2.x, p2.y);

    stroke(strokeColor);
    let start = p1.heading();
    let end = p2.heading();
    let r1 = p1.heading();
    let r2 = p2.heading();

    if ((start < 0 && end < 0) || (start > 0 && end > 0)) {
      if (start > end) {
        start = p2.heading();
        end = p1.heading();
      }
    } else {
      if (r1 < 0) {
        r1 = Math.PI - Math.abs(p1.heading());
      }
      if (r2 < 0) {
        r2 = Math.PI - Math.abs(p2.heading());
      }
      if (r2 > r1) {
        start = p2.heading();
        end = p1.heading();
      }
    }

    noFill();
    arc(0, 0, 50, 50, start, end);

    // no outline for points and use given color for each
    noStroke();
    fill(p1Fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2Fill);
    ellipse(p2.x, p2.y, 10, 10);

    // place text showing distance at midploint of line
    const midPointVec = p1.copy().normalize();
    midPointVec.add(p2.copy().normalize());
    this.arcText(p1, p2, d.toFixed(2), strokeColor, midPointVec);
    pop();
  }
}
