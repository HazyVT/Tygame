export class Scene {

  changingScene: boolean;
  timeToChange: number;

  constructor(timeToChange: number) {
    this.changingScene = false;
    this.timeToChange = timeToChange;
  }

  update(dt: number) {
    
  }

}