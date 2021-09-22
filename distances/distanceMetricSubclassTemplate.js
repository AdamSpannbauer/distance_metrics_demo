import DistanceMetric from './distance_metric.js';
import { midPointText } from './utils.js';

export class MyDistanceMetric extends DistanceMetric {
  // TODO: set this name to a user facing text
  static distName = 'My Distance Metric';

  distance(p1, p2) {
    // TODO: implement distance calc here
    // given 2 2d vectors (each with x & y properties)

    // example using p5js builtin dist function:
    return dist(p1.x, p1.y, p2.x, p2.y);
  }

  drawPair(p1, p2, d, p1Fill, p2Fill, strokeColor) {
    // TODO: implement code to draw a pair of points/vectors
    // given 2 2d vectors (each with x & y properties)

    // example drawing 2 points
    push();
    // transparency in case of overlapping lines
    strokeColor.setAlpha(150);
    // line color
    stroke(strokeColor);
    // draw line between pts
    line(p1.x, p1.y, p2.x, p2.y);

    // no outline for points and use given color for each
    noStroke();
    fill(p1Fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2Fill);
    ellipse(p2.x, p2.y, 10, 10);

    // place text showing distance at midploint of line
    midPointText(p1, p2, d.toFixed(1), strokeColor);
    pop();
  }
}
