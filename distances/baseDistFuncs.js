export function euclideanDist(p1, p2) {
  return dist(p1.x, p1.y, p2.x, p2.y);
}

export function manhattanDist(p1, p2) {
  return abs(p1.x - p2.x) + abs(p1.y - p2.y);
}

export function chebyshevDist(p1, p2) {
  return max([abs(p1.x - p2.x), abs(p1.y - p2.y)]);
}

export function cosineDist(p1, p2) {
  const m1 = sqrt((p1.x ** 2) + (p1.y ** 2));
  const m2 = sqrt((p2.x ** 2) + (p2.y ** 2));
  const dot = (p1.x * p2.x) + (p1.y * p2.y);

  return 1 - dot / (m1 * m2);
}
