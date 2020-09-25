import DistanceMetric from './distance_metric.js';

class EuclideanDistance extends DistanceMetric {
  static dist_name = 'Euclidean';

  distance(p1, p2) {
    return dist(p1.x, p1.y, p2.x, p2.y);
 	}

  draw_pair(p1, p2, d, p1_fill, p2_fill, l_stroke) {
    push();
    l_stroke.setAlpha(150);
    stroke(l_stroke);
    line(p1.x, p1.y, p2.x, p2.y);

    noStroke();
    fill(p1_fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2_fill);
    ellipse(p2.x, p2.y, 10, 10);

    // place text showing distance at midploint
    super.mid_point_text(p1, p2, d.toFixed(1), l_stroke);
    pop();
  }
}

export default EuclideanDistance;
