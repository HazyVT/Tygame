import { GLFW_PRESS, GLFW_RELEASE, GLFWwindow } from "@minecraftts/glfw";

export class KeyListener {

  private listener: KeyListener | null = null;
  private static keyPressed: boolean[] = new Array<boolean>(350); 
  
  constructor() {
    if (this.listener == null) {
      this.listener = new KeyListener();
    }
  }


  static keyCallback(window: GLFWwindow, key: number, scancode: number, action: number, mods: number) {
    if (action == GLFW_PRESS) {
      KeyListener.keyPressed[key] = true;
    } else if (action == GLFW_RELEASE) {
      KeyListener.keyPressed[key] = false;
    }
  }

  static isKeyPressed(keycode: number) {
    return KeyListener.keyPressed[keycode];
  }
}