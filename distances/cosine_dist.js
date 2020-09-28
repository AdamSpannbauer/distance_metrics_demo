import DistanceMetric from './distance_metric.js';

class CosineDistance extends DistanceMetric {
  static dist_name = 'Cosine';

  distance(p1, p2) {
    p1 = Object.values(p1);
    p2 = Object.values(p2);
    let dot = 0;
    let m1 = 0;
    let m2 = 0;
    for(let i=1; i<p1.length; i++){
      dot += (p1[i] * p2[i]);
      m1 += (p1[i]**2)
      m2 += (p2[i]**2);
    }
    m1 = Math.sqrt(m1);
    m2 = Math.sqrt(m2);

    return 1 - dot / (m1*m2);
 	}

  arc_text(p1, p2, t, c, mip_vec) {
    let mip_point = mip_vec.copy();
    mip_point.setMag(20);
    push();
    c.setAlpha(255);
    fill(c);
    strokeWeight(0.5);

    translate(mip_point);
    text(t, mip_point.x, mip_point.y);
    pop();
  }

  draw_pair (p1, p2, d, p1_fill, p2_fill, l_stroke) {
    push();
    l_stroke.setAlpha(150);
    stroke(color('#636EFA'));
    // draw each vector
    line(0, 0, p1.x, p1.y);
    line(0, 0, p2.x, p2.y);

    stroke(l_stroke);
    let start = p1.heading();
    let end = p2.heading();
    let r1 = p1.heading();
    let r2 = p2.heading();

    if((start < 0 && end < 0) || (start > 0 && end > 0)){
      if(start > end){
        start = p2.heading();
        end = p1.heading();
      }
    } else {
      if(r1 < 0){
        r1 = Math.PI - Math.abs(p1.heading());
      }
      if(r2 < 0){
        r2 = Math.PI - Math.abs(p2.heading());
      }
      if(r2 > r1){
          start = p2.heading();
          end = p1.heading();
        }
    }
    
    noFill();
    arc(0, 0, 50, 50, start, end);

    // no outline for points and use given color for each
    noStroke();
    fill(p1_fill);
    ellipse(p1.x, p1.y, 10, 10);

    fill(p2_fill);
    ellipse(p2.x, p2.y, 10, 10);

    // place text showing distance at midploint of line
    let m1 = p1.copy();
    let m2 = p2.copy();
    this.arc_text(p1, p2, d.toFixed(2), l_stroke, m1.normalize().add(m2.normalize()));
    pop();
  }
}

export default CosineDistance;
