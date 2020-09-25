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
