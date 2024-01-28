import { Window } from "./engine/Window";

export function createWindow() {
  const window = new Window();
  window.run();
}