import { createWindow } from "../src";

test('Create a new Window', () => {
  const res = createWindow();
  expect(res).toBe(undefined);
})