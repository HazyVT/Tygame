import { Window } from "./Window";

export abstract class Scene {

  constructor() {
    //
  }

  abstract update(dt: number, window: Window): void;
  
}