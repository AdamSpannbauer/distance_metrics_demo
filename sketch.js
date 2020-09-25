import EuclideanDistance from './distances/euclidean_dist.js';
import ManhattanDistance from './distances/manhattan_dist.js';

// To add a new distance metric add a line adding it to the window object
// Add the metric object to distance_metric_objs
// Prolly a better way to do this
window.EuclideanDistance = EuclideanDistance;
window.ManhattanDistance = ManhattanDistance;

const distance_metric_objs = [
  EuclideanDistance,
  ManhattanDistance,
];

// canvas dimensions
const canvas_w = 640;
const canvas_h = 480;

// Points to measure distances between
let p1 = null;
let p2 = null;
let p3 = null;

// Will hold the selected DistanceMetric object
let distance_metric;

// Will be a key-value store to look up selected DistanceMetric object
const distance_metrics = {};

// Will be a dropdown holding DistanceMetric.dist_name static attributes
let distance_selector;

// Constrain coordintates to canvas and shift so (0, 0) is middle of canvas
function mouseXY() {
  const x = constrain(mouseX - width / 2, -width / 2, width / 2);
  const y = constrain(mouseY - height / 2, -height / 2, height / 2);

  return createVector(x, y);
}

// Set p2 to mouse location when user clicks
function mouseClicked() {
  p2 = mouseXY();
}
window.mouseClicked = mouseClicked;

// Set p3 to mouse location when user presses ENTER
// Set p3 to null when user presses ESCAPE
function keyPressed() {
  if (keyCode === ENTER) {
    p3 = mouseXY();
  } else if (keyCode === ESCAPE) {
    p3 = null;
  }
}
window.keyPressed = keyPressed;

// Change distance metric based on user dropdown selection
function update_dist_metric() {
  const dist_name = distance_selector.value();
  const dm = distance_metrics[dist_name];

  distance_metric = new window[dm](p1, p2, p3);
}

// Initialize:
// * Canvas
// * distance method drop down list
// * distance metric key-value store
function setup() {
  createCanvas(canvas_w, canvas_h);

  distance_selector = createSelect();
  distance_selector.changed(update_dist_metric);

  let first_name = null;
  for (const dm of distance_metric_objs) {
    distance_metrics[dm.dist_name] = dm.name;
    distance_selector.option(dm.dist_name);

    if (!first_name) {
      first_name = dm.dist_name;
    }
  }

  distance_selector.selected(first_name);
  update_dist_metric();
}
window.setup = setup;

// Draw:
// * Axes
// * Whatever draw method implented by selected DistanceMetric
function draw() {
  background(255);
  translate(width / 2, height / 2);

  stroke(0);
  strokeWeight(2);

  // Draw axes with origin in middle
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  // Set y location based on mouse location
  // x is set by mouseClicked()
  // z is set by keyPressed()
  p1 = mouseXY();
  distance_metric.p1 = p1;

  if (p2) {
    // Case when `p3 == null` is handled inside DistanceMetric
    distance_metric.p2 = p2;
    distance_metric.p3 = p3;

    distance_metric.draw();
  }
}
window.draw = draw;
