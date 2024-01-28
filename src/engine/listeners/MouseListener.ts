import { GLFW_PRESS, GLFW_RELEASE, GLFWwindow } from "@minecraftts/glfw";

export class MouseListener {

  private listener: MouseListener | null = null;
  private static scrollX: number = 0;
  private static scrollY: number = 0;
  private static xPos: number = 0;
  private static yPos: number = 0;
  private static lastY: number = 0;
  private static lastX: number = 0;
  private static mouseButtonPressed: boolean[] = new Array<boolean>(3);
  private static isDragging: boolean = false;

  constructor() {
    if (this.listener == null) {
      this.listener = new MouseListener();
    }
  }

  static getPos(window: GLFWwindow, xpos: number, ypos: number) {
    MouseListener.lastX = MouseListener.xPos;
    MouseListener.lastY = MouseListener.yPos;
    MouseListener.xPos = xpos;
    MouseListener.yPos = ypos;
    MouseListener.isDragging = MouseListener.mouseButtonPressed[0] || MouseListener.mouseButtonPressed[1] || MouseListener.mouseButtonPressed[2];
  }

  static mouseButtonCallback(window: GLFWwindow, button: number, action: number, mods: number) {
    if (action == GLFW_PRESS) {
      if (button < MouseListener.mouseButtonPressed.length) {
        MouseListener.mouseButtonPressed[button] = true;
      }
    } else if (action == GLFW_RELEASE) {
      if (button < MouseListener.mouseButtonPressed.length) {
        MouseListener.mouseButtonPressed[button] = false;
        MouseListener.isDragging = false;
      }
    }
  }

  static mouseScrollCallback(window: GLFWwindow, xOffset: number, yOffset: number) {
    MouseListener.scrollX = xOffset;
    MouseListener.scrollY = yOffset;
  }

  static endFrame() {
    MouseListener.scrollX = 0;
    MouseListener.scrollY = 0;
    MouseListener.lastX = MouseListener.xPos;
    MouseListener.lastY = MouseListener.yPos;
  }

  static getX() {
    return MouseListener.xPos;
  }

  static getY() {
    return MouseListener.yPos;
  }

  static getDx() {
    return (MouseListener.lastX - MouseListener.xPos);
  }

  static getDy() {
    return (MouseListener.lastY - MouseListener.yPos);
  }

  static getScrollY() {
    return MouseListener.scrollY;
  }

  static getScrollX() {
    return MouseListener.scrollX;
  }

  static getDragging() {
    return MouseListener.isDragging;
  }

  static mouseButtonDown(button: number) {
    if (button < MouseListener.mouseButtonPressed.length) {
      return MouseListener.mouseButtonPressed[button];
    } else {
      return false;
    }
  }

}