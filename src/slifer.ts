import { ptr, type Pointer } from 'bun:ffi';
import { SDL_Buttons, SDL_EventTypes, SDL_InitFlags, SDL_Keys, gfx, image, sdl, slib } from "./sdl";
import Keyboard from './keyboard';
import Window from './window';
import Mouse from './mouse';
import { Drawable, Rectangle, log } from './utils';

class Slifer {   
    
    private static running = true;

    public static keyboard = Keyboard;
    public static mouse = Mouse;

    public static Rectangle = Rectangle;
    
    private static window: Window | null = null;

    private static escapeIsDefault = true;
    private static printOnRun = true;
    private static version = 0.1;
    private static manager: Pointer | null = null;

    private static top = 0;
    private static bottom = 0;
    private static fps = 60;

    public static keys = SDL_Keys;
    public static buttons = SDL_Buttons;
    
    /**
     * Method to create the window
     * 
     * @param title The title of the window
     * @param width The width of the window
     * @param height The height of the window
     * @returns A window object
     */
    static initWindow(title: string, width: number, height: number) {
        // Initialize SDL library
        const init = sdl.symbols.SDL_Init(SDL_InitFlags.SDL_INIT_VIDEO);
        if (init != 0) {
            throw new Error("SDL failed to initialize");
        }

        if (this.printOnRun) {
            log.green(`Slifer ver ${this.version} has initialized successfully`)
            log.green(sdl.symbols.SDL_GetPlatform().toString());
        }

        // Set Hints
        const rscalehint = sdl.symbols.SDL_SetHint(Buffer.from("SDL_HINT_RENDER_SCALE_QUALITY"), Buffer.from("nearest"));

        if (rscalehint != true) {
            throw new Error("SDL hints failed to initialize");
        }
        

        // Initialize SDL Image library
        const img_init = image.symbols.IMG_Init(3);
        if (img_init == 0) {
            throw new Error("SDL_Image failed to initialize");
        }

        // Initialize Framerate Manager
        this.manager = slib.symbols.CreateManager();
        gfx.symbols.SDL_initFramerate(this.manager);

        if (this.printOnRun) {
            log.green("FPS Manager has been initialized successfully.");
        }


        // Set framerate to 60
        gfx.symbols.SDL_setFramerate(this.manager, 60);

        if (this.printOnRun) {
            log.green("FPS has been set to 60 by default.")
        }

        /*
        Check if window has been created
        Follows singleton data pattern
        */
        if (this.window == null) {
            this.window = new Window(title, width, height);
        }

        return this.window;
    }

    /**
     * Method to check whether slifer should keep running
     * 
     * @returns boolean
     */
    static shouldClose() : boolean {
        const dl = gfx.symbols.SDL_framerateDelay(this.manager);
        
        sdl.symbols.SDL_RenderClear((this.window as any).renderer);            
        // Creates new event array
        const event = new Int16Array(32);
        if (sdl.symbols.SDL_PollEvent(ptr(event))) {
            switch (event[0]) {
                case SDL_EventTypes.SDL_QUIT:
                    this.running = false;
                    break;
                case SDL_EventTypes.SDL_KEYDOWN:
                case SDL_EventTypes.SDL_KEYUP:
                    if (event[10] == this.keys.ESCAPE && this.escapeIsDefault) {
                        this.running = false;
                    } else {
                        (this.keyboard as any).handleKey(event[10], event[6]);
                    }
                    break;
                case SDL_EventTypes.SDL_MOUSEBUTTONDOWN:
                    (this.mouse as any).handleMouseDown(event[8]);
                    break;
                case SDL_EventTypes.SDL_MOUSEBUTTONUP:
                    (this.mouse as any).handleMouseUp(event[8]);
                    break;
            }             
        };

            

        
        // Sets ending tick to start tick
        this.bottom = this.top;
        // Returns whether the window is running or not
        return !this.running;
    }
    
    /**
     * This method removes escape as the default close button
     */
    static removeEscapeAsClose() {
        this.escapeIsDefault = false;
    }

    /**
     * Method to return the fps of the window
     * 
     * @returns fps
     */
    static getFPS() {
        return gfx.symbols.SDL_getFramerate(this.manager);
    } 

    /**
     * Method to ser the fps of the window
     * 
     * @param fps The wanted FPS of the window
     */
    static setFPS(fps: number) {
        this.fps = fps;
    }

    /**
     * Method to set whether Slifer should print its default console logs.
     * Set to true on default
     * 
     * @param flag
     */
    static setPrintOnRun(flag: boolean) {
        this.printOnRun = flag;
    }

    /**
     * Method to load an image
     * 
     * @param path Path to image
     * @returns Drawable object
     */
    static loadImage(path: string) {
        if (this.window == null) {
            throw new Error("Window has not been initialized");
        }
        return new Drawable((this.window as any).renderer, path);
    }

    static draw(drawable: Drawable, src: Rectangle, dest: Rectangle, rotation?: number, flipH?: boolean, flipV?: boolean) {
        const _rotation = rotation || 0;

        let _flip = 0;
        if (flipH && flipV) {
            _flip = 3;
        } else if (flipH) {
            _flip = 1;
        } else if (flipV) {
            _flip = 2;
        } else {
            _flip = 0;
        }

        const i = sdl.symbols.SDL_RenderCopyEx(
            (this.window as any).renderer,
            (drawable as any).pointer,
            (src as any).pointer,
            (dest as any).pointer,
            _rotation,
            null,
            _flip
        )

        if (i != 0) {
            throw new Error("Image failed to be drawn");
        }
    }

    static flip() : void {
        // Renders the renderer to the screen
        sdl.symbols.SDL_RenderPresent((this.window as any).renderer);
    }
}

export default Slifer;