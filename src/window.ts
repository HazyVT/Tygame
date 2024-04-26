import { SDL_WINDOWPOS_CENTERED, sdl } from "./sdl";
import { Drawable } from "./utils";

class Window {
    private window;
    private renderer;

    constructor(title: string, width: number, height: number) {
        this.window = sdl.symbols.SDL_CreateWindow(Buffer.from(title + "\x00"), SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, width, height, 0);
        this.renderer = sdl.symbols.SDL_CreateRenderer(this.window, -1, 0);
    }
}

export default Window;