import { expect, test } from "@jest/globals";
import { createShip } from "./app";
test("adds 1 + 2 to equal 3", () => {
  expect(createShip(2)).toBe(3);
});
