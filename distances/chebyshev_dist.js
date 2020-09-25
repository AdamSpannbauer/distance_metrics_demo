import DistanceMetric from './distance_metric.js';

class ChebyshevDistance extends DistanceMetric {
  // TODO: set this name to a user facing text
  static dist_name = 'Chebyshev';

  constructor() {
    super();
  }

  distance(p1, p2) {
    const dx = abs(p1.x - p2.x);
    const dy = abs(p1.y - p2.y);

    let d;
    if (dx >= dy) {
      d = dx;
    } else {
      d = dy;
    }

    return d;
 	}

  draw_pair(p1, p2, d, p1_fill, p2_fill, l_stroke) {
    const dx = abs(p1.x - p2.x);
    const dy = abs(p1.y - p2.y);
    
    push();
    noStroke();
    fill(p1_fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2_fill);
    ellipse(p2.x, p2.y, 10, 10);

    stroke(l_stroke)
    if (dx >= dy) {
      line(p1.x, p1.y, p2.x, p1.y);
      super.mid_point_text(
        createVector(p1.x, p1.y),
        createVector(p2.x, p1.y),
        d.toFixed(3),
        l_stroke,
      );
    } else {
      line(p1.x, p1.y, p1.x, p2.y);
      super.mid_point_text(
        createVector(p1.x, p1.y),
        createVector(p1.x, p2.y),
        d.toFixed(3),
        l_stroke,
      );
    }
    pop();
  }
}

export default ChebyshevDistance;
