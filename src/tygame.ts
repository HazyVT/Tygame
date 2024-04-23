import { ptr } from 'bun:ffi';
import { SDL_EventTypes, SDL_InitFlags, SDL_Keys, SDL_WINDOWPOS_CENTERED, sdl } from "./SDL/sdl";


class Window {
    private window;
    private renderer;

    constructor(title: string, width: number, height: number) {
        this.window = sdl.symbols.SDL_CreateWindow(Buffer.from(title + "\x00"), SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, width, height, 0);
        this.renderer = sdl.symbols.SDL_CreateRenderer(this.window, -1, 0);
    }
}

class Keyboard {

    private static keyMap = new Map<number, boolean>();
    private static keyPressedMap = new Map<number, boolean>([
        [0 , false],
        [8 , false],
        [9 , false],
        [13 , false],
        [27 , false],
        [32 , false],
        [33 , false],
        [34 , false],
        [35 , false],
        [36 , false],
        [37 , false],
        [38 , false],
        [39 , false],
        [40 , false],
        [41 , false],
        [42 , false],
        [43 , false],
        [44 , false],
        [45 , false],
        [46 , false],
        [47 , false],
        [48 , false],
        [49 , false],
        [50 , false],
        [51 , false],
        [52 , false],
        [53 , false],
        [54 , false],
        [55 , false],
        [56 , false],
        [57 , false],
        [58 , false],
        [59 , false],
        [60 , false],
        [61 , false],
        [62 , false],
        [63 , false],
        [64 , false],
        [91 , false],
        [92 , false],
        [93 , false],
        [94 , false],
        [95 , false],
        [96 , false],
        [97 , false],
        [98 , false],
        [99 , false],
        [100 , false],
        [101 , false],
        [102 , false],
        [103 , false],
        [104 , false],
        [105 , false],
        [106 , false],
        [107 , false],
        [108 , false],
        [109 , false],
        [110 , false],
        [111 , false],
        [112 , false],
        [113 , false],
        [114 , false],
        [115 , false],
        [116 , false],
        [117 , false],
        [118 , false],
        [119 , false],
        [120 , false],
        [121 , false],
        [122 , false],
        [127 , false],
        [1073741881 , false],
        [1073741882 , false],
        [1073741883 , false],
        [1073741884 , false],
        [1073741885 , false],
        [1073741886 , false],
        [1073741887 , false],
        [1073741888 , false],
        [1073741889 , false],
        [1073741890 , false],
        [1073741891 , false],
        [1073741892 , false],
        [1073741893 , false],
        [1073741894 , false],
        [1073741895 , false],
        [1073741896 , false],
        [1073741897 , false],
        [1073741898 , false],
        [1073741899 , false],
        [1073741901 , false],
        [1073741902 , false],
        [1073741903 , false],
        [1073741904 , false],
        [1073741905 , false],
        [1073741906 , false],
        [1073741907 , false],
        [1073741908 , false],
        [1073741909 , false],
        [1073741910 , false],
        [1073741911 , false],
        [1073741912 , false],
        [1073741913 , false],
        [1073741914 , false],
        [1073741915 , false],
        [1073741916 , false],
        [1073741917 , false],
        [1073741918 , false],
        [1073741919 , false],
        [1073741920 , false],
        [1073741921 , false],
        [1073741922 , false],
        [1073741923 , false],
        [1073741925 , false],
        [1073741926 , false],
        [1073741927 , false],
        [1073741928 , false],
        [1073741929 , false],
        [1073741930 , false],
        [1073741931 , false],
        [1073741932 , false],
        [1073741933 , false],
        [1073741934 , false],
        [1073741935 , false],
        [1073741936 , false],
        [1073741937 , false],
        [1073741938 , false],
        [1073741939 , false],
        [1073741940 , false],
        [1073741941 , false],
        [1073741942 , false],
        [1073741943 , false],
        [1073741944 , false],
        [1073741945 , false],
        [1073741946 , false],
        [1073741947 , false],
        [1073741948 , false],
        [1073741949 , false],
        [1073741950 , false],
        [1073741951 , false],
        [1073741952 , false],
        [1073741953 , false],
        [1073741957 , false],
        [1073741958 , false],
        [1073741977 , false],
        [1073741978 , false],
        [1073741979 , false],
        [1073741980 , false],
        [1073741981 , false],
        [1073741982 , false],
        [1073741983 , false],
        [1073741984 , false],
        [1073741985 , false],
        [1073741986 , false],
        [1073741987 , false],
        [1073741988 , false],
        [1073742000 , false],
        [1073742001 , false],
        [1073742002 , false],
        [1073742003 , false],
        [1073742004 , false],
        [1073742005 , false],
        [1073742006 , false],
        [1073742007 , false],
        [1073742008 , false],
        [1073742009 , false],
        [1073742010 , false],
        [1073742011 , false],
        [1073742012 , false],
        [1073742013 , false],
        [1073742014 , false],
        [1073742015 , false],
        [1073742016 , false],
        [1073742017 , false],
        [1073742018 , false],
        [1073742019 , false],
        [1073742020 , false],
        [1073742021 , false],
        [1073742022 , false],
        [1073742023 , false],
        [1073742024 , false],
        [1073742025 , false],
        [1073742026 , false],
        [1073742027 , false],
        [1073742028 , false],
        [1073742029 , false],
        [1073742030 , false],
        [1073742031 , false],
        [1073742032 , false],
        [1073742033 , false],
        [1073742034 , false],
        [1073742035 , false],
        [1073742036 , false],
        [1073742037 , false],
        [1073742038 , false],
        [1073742039 , false],
        [1073742040 , false],
        [1073742041 , false],
        [1073742042 , false],
        [1073742043 , false],
        [1073742044 , false],
        [1073742045 , false],
        [1073742048 , false],
        [1073742049 , false],
        [1073742050 , false],
        [1073742051 , false],
        [1073742052 , false],
        [1073742053 , false],
        [1073742054 , false],
        [1073742055 , false],
        [1073742081 , false],
        [1073742082 , false],
        [1073742083 , false],
        [1073742084 , false],
        [1073742085 , false],
        [1073742086 , false],
        [1073742087 , false],
        [1073742088 , false],
        [1073742089 , false],
        [1073742090 , false],
        [1073742091 , false],
        [1073742092 , false],
        [1073742093 , false],
        [1073742094 , false],
        [1073742095 , false],
        [1073742096 , false],
        [1073742097 , false],
        [1073742098 , false],
        [1073742099 , false],
        [1073742100 , false],
        [1073742101 , false],
        [1073742102 , false],
        [1073742103 , false],
        [1073742104 , false],
        [1073742105 , false],
        [1073742106 , false]
    ]);
    
    private static held = false;

    public static handleKey(key: number, type: number) {
        if (type == 1) {
            this.keyMap.set(key, true);
        } else if (type == 0) {
            this.keyMap.set(key, false);
            this.held = false;
        }
    }

    public static isKeyDown(key: number) {
        const val = this.keyMap.get(key);
        if (val == true) {
            return true;
        } else {
            return false;
        }
    }

    public static isKeyPressed(key: number) {
        const resp = this.isKeyDown(key);
        if (resp && this.keyPressedMap.get(key) == false) {
            this.keyPressedMap.set(key, true);
            return true;
        } else if (!resp) {
            this.keyPressedMap.set(key, false);
        }
        return false;
    }

}


class Tygame {   
    
    private static running = true;
    private static keyboard = Keyboard;
    
    private static window: Window | null = null;
    private static escapeIsDefault = true;
    

    public static keys = SDL_Keys;
    
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

export default Tygame;