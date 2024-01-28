import { GLFW_FALSE, GLFW_MAXIMIZED, GLFW_RESIZABLE, GLFW_TRUE, GLFW_VISIBLE, GLFWwindow, glfwCreateWindow, glfwDefaultWindowHints, glfwDestroyWindow, glfwGetVersionString, glfwInit, glfwMakeContextCurrent, glfwPollEvents, glfwSetCursorPosCallback, glfwSetErrorCallback, glfwSetKeyCallback, glfwSetMouseButtonCallback, glfwSetScrollCallback, glfwShowWindow, glfwSwapBuffers, glfwSwapInterval, glfwTerminate, glfwWindowHint, glfwWindowShouldClose } from "@minecraftts/glfw";
import { GL_COLOR_BUFFER_BIT, glClear, glClearColor } from "@minecraftts/opengl";
import { MouseListener } from "./listeners/MouseListener";
import { KeyListener } from "./listeners/KeyListener";
import { Time } from "./util/Time";

export class Window {
  private width: number;
  private height: number;
  private title: string;

  private window: Window | null = null;
  private glfwWindow: GLFWwindow | null = null;

  constructor() {
    this.width = 640;
    this.height = 480;
    this.title = "Platformer";
  }

  get() {
    if (this.window == null) {
      this.window = new Window();
    }

    return this.window
  }

  run() {
    console.log("Hello From GLFW " + glfwGetVersionString());

    this.init();
    this.loop();

    // Free the memory
    if (this.glfwWindow != null) {
      glfwDestroyWindow(this.glfwWindow);
      
      glfwTerminate();
    }

  }

  private init() {
    // Setup error callback
    glfwSetErrorCallback((err) => {
      console.error(err);
    })
    
    // Initialize GLFW
    if (!glfwInit()) {
      console.error("Unable to initialize GLFW");
    }

    // Configure GLFW
    glfwDefaultWindowHints();
    glfwWindowHint(GLFW_VISIBLE, GLFW_FALSE);
    glfwWindowHint(GLFW_RESIZABLE, GLFW_TRUE);
    glfwWindowHint(GLFW_MAXIMIZED, GLFW_TRUE);

    // Create the window
    this.glfwWindow = glfwCreateWindow(this.width, this.height, this.title, null, null);
    if (this.glfwWindow == null) {
      console.error("Failed to create the GLFW Window");
    }

    glfwSetCursorPosCallback(this.glfwWindow, MouseListener.getPos);
    glfwSetMouseButtonCallback(this.glfwWindow, MouseListener.mouseButtonCallback);
    glfwSetScrollCallback(this.glfwWindow, MouseListener.mouseScrollCallback);

    glfwSetKeyCallback(this.glfwWindow, KeyListener.keyCallback);

    // Make the opengl context current
    glfwMakeContextCurrent(this.glfwWindow);

    // Enable vsync
    glfwSwapInterval(1);

    // Make the window visible
    glfwShowWindow(this.glfwWindow);

    return "Window created Successfully";
  }

  loop() {
    let beginTime = Time.getTime();
    let endTime = Time.getTime();

    while (this.glfwWindow != null && !glfwWindowShouldClose(this.glfwWindow)) {
      glfwPollEvents();

      glClearColor(1, 1, 1, 0);
      glClear(GL_COLOR_BUFFER_BIT);

      glfwSwapBuffers(this.glfwWindow);

      endTime = Time.getTime();
      let dt = endTime - beginTime;
      beginTime = endTime;
    }
  }
}