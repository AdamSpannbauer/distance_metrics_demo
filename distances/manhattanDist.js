import { DistanceMetric } from './distanceMetric.js';
import { midPointText } from './utils.js';

export class ManhattanDistance extends DistanceMetric {
  static distName = 'Manhattan';

  distance(p1, p2) {
    const dx = abs(p1.x - p2.x);
    const dy = abs(p1.y - p2.y);

    return dx + dy;
  }

  drawPair(p1, p2, d, p1Fill, p2Fill, strokeColor) {
    push();
    strokeColor.setAlpha(150);
    stroke(strokeColor);

    line(p1.x, p1.y, p2.x, p1.y);
    line(p2.x, p1.y, p2.x, p2.y);

    noStroke();
    fill(p1Fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2Fill);
    ellipse(p2.x, p2.y, 10, 10);

    midPointText(p1, p2, d.toFixed(1), strokeColor);
    pop();
  }
}
