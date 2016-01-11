class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getDist() { 
        return Math.sqrt(this.x * this.x + 
        this.y * this.y); 
    }
}
var p = new Point(3,4);
var dist = p.getDist();
alert("Hypotenuse is: " + dist);



class Hero {
	id: number;
	name: string;
}

public hero: Hero = {
  id: 1,
  name: 'Windstorm'
};
