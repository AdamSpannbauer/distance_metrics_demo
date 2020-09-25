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

  draw_pair (p1, p2, d) {
    // TODO: implement code to draw a pair of points/vectors
    // given 2 2d vectors (each with x & y properties)

    // example drawing 2 points
    ellipse(p1.x, p1.y, 6, 6);
    ellipse(p2.x, p2.y, 6, 6);

    // place text showing distance at midploint
    super.mid_point_text(p1, p2, d.toFixed(3));
  }
}

export default MyDistanceMetric;
