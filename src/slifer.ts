import { ptr } from 'bun:ffi';
import { SDL_Buttons, SDL_EventTypes, SDL_InitFlags, SDL_Keys, sdl } from "./sdl";
import Keyboard from './keyboard';
import Window from './window';

class Slifer {   
    
    private static running = true;
    private static keyboard = Keyboard;
    
    private static window: Window | null = null;
    private static escapeIsDefault = true;
    

    public static keys = SDL_Keys;
    public static buttons = SDL_Buttons;
    
    static initWindow(title: string, width: number, height: number) {
        const init = sdl.symbols.SDL_Init(SDL_InitFlags.SDL_INIT_VIDEO);
        if (init != 0) {
            throw new Error("SDL failed to initialize");
        }

        if (this.window == null) {
            this.window = new Window(title, width, height);
        }

        return this.window;
    }

    static shouldClose() : boolean {
        const event = new Uint32Array(32);
        sdl.symbols.SDL_PollEvent(ptr(event));

        switch (event[0]) {
            case SDL_EventTypes.SDL_QUIT:
                this.running = false;
                break;
            case SDL_EventTypes.SDL_KEYDOWN:
            case SDL_EventTypes.SDL_KEYUP:
                if (event[5] == this.keys.ESCAPE && this.escapeIsDefault) {
                    this.running = false;
                } else {
                    this.keyboard.handleKey(event[5], event[3]);
                }
                break;
            case SDL_EventTypes.SDL_MOUSEBUTTONDOWN:
            case SDL_EventTypes.SDL_MOUSEBUTTONUP:
                console.log(event);
                break;
        }
        return !this.running;
    }

    static isKeyDown(key: number) {
        return this.keyboard.isKeyDown(key);
    }

    static isKeyPressed(key: number) {
        return this.keyboard.isKeyPressed(key);
    }

    static removeEscapeAsClose() {
        this.escapeIsDefault = false;
    }
}

export default Slifer;