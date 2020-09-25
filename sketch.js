import DistanceMetric from './distance_metric.js';

const canvas_w = 640;
const canvas_h = 480;

let x = null;
let y = null;
let z = null;
let distance_metric = null;

function setup() {
  createCanvas(canvas_w, canvas_h);
}

function mouseClicked() {
  x = createVector(mouseX - width / 2, mouseY - height / 2);
}

function keyPressed() {
  if (keyCode === ENTER) {
    z = createVector(mouseX - width / 2, mouseY - height / 2);
  } else if (keyCode === ESCAPE) {
    z = null;
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // Draw axes with origin in middle
  stroke(255);
  strokeWeight(2);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  // Set y location based on mouse
  y = createVector(mouseX - width / 2, mouseY - height / 2);

  // Create dist metric if both x and y exist
  if (x && y && !distance_metric) {
    distance_metric = new DistanceMetric(x, y);
  }

  // Update y location and draw if dist metric exists
  if (distance_metric) {
    distance_metric.p2 = y;
    distance_metric.draw();
  }
}

window.mouseClicked = mouseClicked;
window.setup = setup;
window.draw = draw;

// function mid_point_text(p1, p2, t) {
//   const mp = createVector((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);

//   push();
//   strokeWeight(0.5);
//   stroke(250);
//   fill(250);
//   translate(p1);
//   text(t, mp.x + 10, mp.y + 20);
//   pop();
// }
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
