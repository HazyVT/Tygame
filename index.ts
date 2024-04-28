import Slifer from "./src/slifer";

const window = Slifer.initWindow("Slifer", 640, 480);

const naked = Slifer.loadImage("naked.png");
const nkdsrc = new Slifer.Rectangle(0,0,32,32);
const nkddest = new Slifer.Rectangle(32,32,128,128);

while (!Slifer.shouldClose()) {
    Slifer.draw(naked, nkdsrc, nkddest, 0);    

    Slifer.flip();
}

