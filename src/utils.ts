import {type Pointer} from "bun:ffi";
import { image, slib } from "./sdl";
import Slifer from "./slifer";

export class Rectangle {

    private pointer;

    constructor(x: number, y: number, width: number, height: number) {
        this.pointer = slib.symbols.CreateRect(x, y, width, height);
    }

    setX(x: number) {
        slib.symbols.SetRectXPosition(this.pointer, x);
    }

    setY(y: number) {
        slib.symbols.SetRectYPosition()
    }

    setWidth(width: number) {
        slib.symbols.SetRectWidth(width);
    }

    setHeight(height: number) {
        slib.symbols.SetRectHeight(height);
    }
}

export class Drawable {
    private pointer : Pointer | null = null;

    constructor(renderer: Pointer | null, path: string) {
        this.pointer = image.symbols.IMG_LoadTexture(renderer, Buffer.from(path + "\x00"));

        if (this.pointer == null) {
            throw new Error("Image failed to be loaded");
        }

        if ((Slifer as any).printOnRun) {
            log.green(`Image at path '${path}' has been loaded successfully.`);
        }
    }
}

const reset = "\x1b[0m";

export const log = {
  green: (text: string) => console.log("\x1b[32m" + text + reset),
  red: (text: string) => console.log("\x1b[31m" + text + reset),
  blue: (text: string) => console.log("\x1b[34m" + text + reset),
  yellow: (text: string) => console.log("\x1b[33m" + text + reset),
};