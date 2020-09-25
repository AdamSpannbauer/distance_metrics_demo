import DistanceMetric from './distance_metric.js';

class EuclideanDistance extends DistanceMetric {
  static dist_name = 'Euclidean';

  distance(p1, p2) {
    return dist(p1.x, p1.y, p2.x, p2.y);
 	}

  draw_pair (p1, p2, d) {
    line(p1.x, p1.y, p2.x, p2.y);
    ellipse(p1.x, p1.y, 6, 6);
    ellipse(p2.x, p2.y, 6, 6);

    // place text showing distance at midploint
    super.mid_point_text(p1, p2, d.toFixed(3));
  }
}

export default EuclideanDistance;
