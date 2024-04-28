#include <stdlib.h>

typedef struct Rect {
    int x, y;
    int w, h;
} Rect;

typedef struct FPSManager {
    int framerate;
    float rateticks;
    int baseticks;
    int lastticks;
    int rate;
} FPSManager;

extern "C" Rect* CreateRect(int x, int y, int width, int height) {
    Rect* ptr = (Rect*)malloc(sizeof(Rect));
    *ptr = Rect{x,y,width,height};
    return ptr;
}

extern "C" FPSManager* CreateManager() {
    FPSManager* ptr = (FPSManager*)malloc(sizeof(FPSManager));
    return ptr;
}

extern "C" void SetRectXPosition(Rect* ptr, int x) {
    Rect rect = *ptr;
    rect.x = x;
    *ptr = rect;
}

extern "C" void SetRectYPosition(Rect* ptr, int y) {
    Rect rect = *ptr;
    rect.y = y;
    *ptr = rect;
}

extern "C" void SetRectWidth(Rect* ptr, int width) {
    Rect rect = *ptr;
    rect.w = width;
    *ptr = rect;
}

extern "C" void SetRectHeight(Rect* ptr, int height) {
    Rect rect = *ptr;
    rect.h = height;
    *ptr = rect;
}