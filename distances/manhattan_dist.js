import DistanceMetric from './distance_metric.js';

class ManhattanDistance extends DistanceMetric {
  static dist_name = 'Manhattan';

  distance(p1, p2) {
    const dx = abs(p1.x - p2.x);
    const dy = abs(p1.y - p2.y);

    return dx + dy;
 	}

  draw_pair(p1, p2, d, p1_fill, p2_fill, l_stroke) {
    push();
    l_stroke.setAlpha(150);
    stroke(l_stroke);

    line(p1.x, p1.y, p2.x, p1.y);
    line(p2.x, p1.y, p2.x, p2.y);

    noStroke();
    fill(p1_fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2_fill);
    ellipse(p2.x, p2.y, 10, 10);

    super.mid_point_text(
      createVector(p1.x, p1.y),
      createVector(p2.x, p1.y),
      d.toFixed(1),
      l_stroke,
    );
    pop();
  }
}

export default ManhattanDistance;
