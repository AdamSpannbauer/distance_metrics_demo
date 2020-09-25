import DistanceMetric from './distance_metric.js';

class MyDistanceMetric extends DistanceMetric {
  // TODO: set this name to a user facing text
  static dist_name = 'My Distance Metric';

  distance(p1, p2) {
    // TODO: implement distance calc here
    // given 2 2d vectors (each with x & y properties)

    // example using p5js builtin dist function:
    return dist(p1.x, p1.y, p2.x, p2.y);
 	}

  draw_pair (p1, p2, d, p1_fill, p2_fill, l_stroke) {
    // TODO: implement code to draw a pair of points/vectors
    // given 2 2d vectors (each with x & y properties)

    // example drawing 2 points
    push();
    // transparency in case of overlapping lines
    l_stroke.setAlpha(150);
    // line color
    stroke(l_stroke);
    // draw line between pts
    line(p1.x, p1.y, p2.x, p2.y);

    // no outline for points and use given color for each
    noStroke();
    fill(p1_fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2_fill);
    ellipse(p2.x, p2.y, 10, 10);

    // place text showing distance at midploint of line
    super.mid_point_text(p1, p2, d.toFixed(1), l_stroke);
    pop();
  }
}

export default MyDistanceMetric;
