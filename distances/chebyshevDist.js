import { chebyshevDist } from './baseDistFuncs.js';
import { DistanceMetric } from './distanceMetric.js';
import { midPointText } from './utils.js';

export class ChebyshevDistance extends DistanceMetric {
  // TODO: set this name to a user facing text
  static distName = 'Chebyshev';

  distance(p1, p2) {
    return chebyshevDist(p1, p2);
  }

  drawPair(p1, p2, d, p1Fill, p2Fill, strokeColor) {
    const dx = abs(p1.x - p2.x);
    const dy = abs(p1.y - p2.y);

    push();
    stroke(strokeColor);
    if (dx >= dy) {
      line(p1.x, p1.y, p2.x, p1.y);
    } else {
      line(p1.x, p1.y, p1.x, p2.y);
    }

    noStroke();
    fill(p1Fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2Fill);
    ellipse(p2.x, p2.y, 10, 10);

    if (dx >= dy) {
      midPointText(p1, { x: p2.x, y: p1.y }, d.toFixed(1), strokeColor);
    } else {
      midPointText(p1, { x: p1.x, y: p2.y }, d.toFixed(1), strokeColor);
    }
    pop();
  }
}
