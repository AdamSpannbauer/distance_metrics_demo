/**
 * A utility to write arrays of string color pairs to allow changing
 * color mid-text.
 *
 * @param {array} textArr an array of [string, color] pairs to write to screen
 * @param {number} x x location to write text
 * @param {number} y y location to write text
 */
export function drawText(textArr, x, y) {
  let xi = x;

  for (let i = 0; i < textArr.length; i += 1) {
    const textPart = textArr[i];
    const t = textPart[0];
    const c = textPart[1];
    const w = textWidth(t);

    fill(c);
    stroke(c);
    text(t, xi, y);
    xi += w;
  }
}

/**
 * Write text at the mid-point between 2 {x, y} locations
 *
 * @param {object} p1 {x, y} location of first point
 * @param {object} p2 {x, y} location of second point
 * @param {string} t text to write between p1 & p2
 * @param {array} c text color as RGB (or p5js color object)
 */
export function midPointText(p1, p2, t, c) {
  const midPoint = createVector((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);

  push();
  // eslint-disable-next-line no-param-reassign
  c = color(c);
  c.setAlpha(255);
  fill(c);
  strokeWeight(0.5);

  translate(p1);
  text(t, midPoint.x + 10, midPoint.y + 20);
  pop();
}
