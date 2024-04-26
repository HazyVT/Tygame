import Slifer from "./src/slifer";

const window = Slifer.initWindow("Slifer", 640, 480);

const naked = Slifer.loadImage("naked.png");
const nkdsrc = new Slifer.Rectangle(0,0,32,32);
const nkddest = new Slifer.Rectangle(32,32,128,128);

let rot = 0;

while (!Slifer.shouldClose()) {
    rot += 0.1;
    
    Slifer.draw(naked, nkdsrc, nkddest, rot);
}

