#include <windows.h>
#include <iostream>

typedef struct SDL_Window SDL_Window;

typedef int(*initProc)(int);
typedef SDL_Window*(*createWindowProc)(const char*, int, int, int);
typedef void(*quitProc)();

typedef enum SDL_InitFlags
{
    SDL_INIT_TIMER        = 0x00000001,
    SDL_INIT_AUDIO        = 0x00000010,  /**< `SDL_INIT_AUDIO` implies `SDL_INIT_EVENTS` */
    SDL_INIT_VIDEO        = 0x00000020,  /**< `SDL_INIT_VIDEO` implies `SDL_INIT_EVENTS` */
    SDL_INIT_JOYSTICK     = 0x00000200,  /**< `SDL_INIT_JOYSTICK` implies `SDL_INIT_EVENTS`, should be initialized on the same thread as SDL_INIT_VIDEO on Windows if you don't set SDL_HINT_JOYSTICK_THREAD */
    SDL_INIT_HAPTIC       = 0x00001000,
    SDL_INIT_GAMEPAD      = 0x00002000,  /**< `SDL_INIT_GAMEPAD` implies `SDL_INIT_JOYSTICK` */
    SDL_INIT_EVENTS       = 0x00004000,
    SDL_INIT_SENSOR       = 0x00008000,  /**< `SDL_INIT_SENSOR` implies `SDL_INIT_EVENTS` */
    SDL_INIT_CAMERA       = 0x00010000   /**< `SDL_INIT_CAMERA` implies `SDL_INIT_EVENTS` */
} SDL_InitFlags;

int SDL_WINDOW_TRANSPARENT    =      0x40000000U;

HINSTANCE hInstLib = LoadLibrary(TEXT("lib/SDL2.dll"));

void quit() {
    quitProc qproc = (quitProc)GetProcAddress(hInstLib, "SDL_Quit");
    (qproc)();
}

int init(const char* title, int w, int h) {
    createWindowProc createAdd = (createWindowProc)GetProcAddress(hInstLib, "SDL_CreateWindow");
    initProc initAdd = (initProc)GetProcAddress(hInstLib, "SDL_Init");

    int v = (initAdd)(SDL_INIT_TIMER | SDL_INIT_AUDIO | SDL_INIT_VIDEO | SDL_INIT_JOYSTICK | SDL_INIT_HAPTIC | SDL_INIT_GAMEPAD | SDL_INIT_EVENTS | SDL_INIT_SENSOR | SDL_INIT_CAMERA);

    if (v != 0) {
        std::cerr << "SDL failed to initialize." << std::endl;
        return -1;
    }

    SDL_Window* window = (createAdd)(title, w, h, 0);

    if (window == nullptr) {
        std::cerr << "Window failed to be created." << std::endl;
        quit();
        return -1;
    }



}

int main() {
    init("Hello World!", 640, 480);
    while (true) {

    }
}

