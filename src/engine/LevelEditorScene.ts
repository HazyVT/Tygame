import { GLFW_KEY_SPACE } from "@minecraftts/glfw";
import { Scene } from "./Scene";
import { KeyListener } from "./listeners/KeyListener";
import { Window } from "./Window";

export class LevelEditorScene extends Scene{

  private changingScene: boolean = false;
  private timeToChange = 2;

  constructor() {
    super();
    console.log("Inside Level Editor Scene");
  }
  
  update(dt: number, window: Window): void {
    if (!this.changingScene && KeyListener.isKeyPressed(GLFW_KEY_SPACE)) {
      this.changingScene = true;
    }

    if (this.changingScene && this.timeToChange > 0) {
      this.timeToChange -= dt;
    } else if (this.changingScene) {
      window.changeScene(1)
      window.r -= dt * 5;
      window.g -= dt * 5;
      window.b -= dt * 5;
    }
  }

}