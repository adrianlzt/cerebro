class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);
  // Esta línea de encima es "syntactic sugar" para hacer esto de abajo:
  //Point(double x, double y) {
  //  this.x = x;
  //  this.y = y;
  //}
}
