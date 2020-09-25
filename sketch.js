import DistanceMetric from './distances/distance_metric.js';

const canvas_w = 640;
const canvas_h = 480;

let p1 = null;
let p2 = null;
let p3 = null;
let distance_metric;

function mouseXY() {
  const x = constrain(mouseX - width / 2, -width / 2, width / 2);
  const y = constrain(mouseY - height / 2, -height / 2, height / 2);

  return createVector(x, y);
}

function mouseClicked() {
  p2 = mouseXY();
}
window.mouseClicked = mouseClicked;

function keyPressed() {
  if (keyCode === ENTER) {
    p3 = mouseXY();
  } else if (keyCode === ESCAPE) {
    p3 = null;
  }
}
window.keyPressed = keyPressed;

function setup() {
  createCanvas(canvas_w, canvas_h);
  distance_metric = new DistanceMetric();
}
window.setup = setup;

function draw() {
  background(0);
  translate(width / 2, height / 2);

  stroke(255);
  strokeWeight(2);

  // Draw axes with origin in middle
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  // Set y location based on mouse
  // x is set by mouseClicked()
  // z is set by keyPressed()
  p1 = mouseXY();
  distance_metric.p1 = p1;

  if (p2) {
    // null p3 is handled inside DistanceMetric
    distance_metric.p2 = p2;
    distance_metric.p3 = p3;

    distance_metric.draw();
  }
}
window.draw = draw;

//
// function manhattan_distance(p1, p2, name, text_y) {
//   const dist_x = abs(p1.x - p2.x);
//   const dist_y = abs(p1.y - p2.y);
//   const dist = dist_x + dist_y;

//   if (dist_calc == 'Manhattan') {
//     const l1p1 = createVector(p1.x, p1.y);
//     const l1p2 = createVector(p2.x, p1.y);
//     const l2p1 = createVector(p2.x, p1.y);
//     const l2p2 = createVector(p2.x, p2.y);

//     mid_point_text(l1p1, l1p2, dist_x.toFixed(0));
//     mid_point_text(l2p1, l2p2, dist_y.toFixed(0));

//     fill(250);
//     stroke(250);
//     strokeWeight(3);
//     line(l1p1.x, l1p1.y, l1p2.x, l1p2.y);
//     line(l2p1.x, l2p1.y, l2p2.x, l2p2.y);

//     return_dist = dist;
//   } else {
//     return_dist = 0;
//   }

//   push();
//   strokeWeight(0.5);
//   fill(250);
//   stroke(250);
//   text(`Manhattan d(${name}): ${dist.toFixed(0)}`, 20, text_y);
//   pop();

//   return (return_dist);
// }

// function chebyshev_distance(p1, p2, name, text_y) {
//   const dist_x = abs(p1.x - p2.x);
//   const dist_y = abs(p1.y - p2.y);
//   const dist = max([dist_x, dist_y]);

//   if (dist_calc == 'Chebyshev') {
//     const lp1 = createVector(p1.x, p1.y);
//     let lp2;
//     if (dist == dist_x) {
//       lp2 = createVector(p2.x, p1.y);
//     } else {
//       lp2 = createVector(p1.x, p2.y);
//     }

//     mid_point_text(lp1, lp2, dist.toFixed(0));

//     fill(250);
//     stroke(250);
//     strokeWeight(3);
//     line(lp1.x, lp1.y, lp2.x, lp2.y);

//     return_dist = dist;
//   } else {
//     return_dist = 0;
//   }

//   push();
//   strokeWeight(0.5);
//   fill(250);
//   stroke(250);
//   text(`Chebyshev d(${name}): ${dist.toFixed(0)}`, 20, text_y);
//   pop();

//   return (return_dist);
// }
