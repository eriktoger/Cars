import {
  BACKWARD,
  EAST,
  FORWARD,
  INCORRECT_INPUT,
  LEFT,
  NORTH,
  OUT_OF_BOUND,
  RIGHT,
  SOUTH,
  WEST,
} from "./constants";
import { moveCar } from "./moveCar";
import { Direction } from "./types";

test("Check if car can move and turn", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(5, 5, 0, 0, EAST, [
    ...Array(2).fill(FORWARD),
    LEFT,
    ...Array(2).fill(FORWARD),
  ]);

  expect(finalX).toBe(2);
  expect(finalY).toBe(2);
  expect(finalDirection).toBe(NORTH);
  expect(error).toBe(null);
});

test("Crash car before last action", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(5, 5, 0, 0, EAST, [
    BACKWARD,
    BACKWARD,
  ]);

  expect(finalX).toBe(-1);
  expect(finalY).toBe(0);
  expect(finalDirection).toBe(EAST);
  expect(error).toBe(OUT_OF_BOUND);
});

test("Car can crash into north wall", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(
    10,
    10,
    4,
    4,
    EAST,
    [
      ...Array(5).fill(FORWARD),
      LEFT,
      ...Array(3).fill(BACKWARD),
      LEFT,
      FORWARD,
      FORWARD,
      RIGHT,
      ...Array(9).fill(FORWARD),
    ]
  );

  expect(finalX).toBe(7);
  expect(finalY).toBe(10);
  expect(finalDirection).toBe(NORTH);
  expect(error).toBe(OUT_OF_BOUND);
});

test("Car can crash into west wall", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(
    10,
    10,
    4,
    4,
    NORTH,
    [
      ...Array(5).fill(FORWARD),
      LEFT,
      ...Array(3).fill(FORWARD),
      LEFT,
      FORWARD,
      FORWARD,
      RIGHT,
      ...Array(2).fill(FORWARD),
    ]
  );

  expect(finalX).toBe(-1);
  expect(finalY).toBe(7);
  expect(finalDirection).toBe(WEST);
  expect(error).toBe(OUT_OF_BOUND);
});

test("Car can crash into south wall", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(
    10,
    10,
    4,
    4,
    NORTH,
    [
      ...Array(3).fill(FORWARD),
      RIGHT,
      ...Array(3).fill(BACKWARD),
      RIGHT,
      ...Array(8).fill(FORWARD),
    ]
  );

  expect(finalX).toBe(1);
  expect(finalY).toBe(-1);
  expect(finalDirection).toBe(SOUTH);
  expect(error).toBe(OUT_OF_BOUND);
});

test("Car can crash into east wall", () => {
  const { finalX, finalY, finalDirection, error } = moveCar(
    10,
    10,
    4,
    4,
    WEST,
    [...Array(3).fill(FORWARD), LEFT, FORWARD, LEFT, ...Array(9).fill(FORWARD)]
  );

  expect(finalX).toBe(10);
  expect(finalY).toBe(3);
  expect(finalDirection).toBe(EAST);
  expect(error).toBe(OUT_OF_BOUND);
});

test("Wrong x input", () => {
  const wrong_x = "x" as unknown as number;
  const { error } = moveCar(wrong_x, 10, 4, 4, WEST, [FORWARD]);

  expect(error).toBe(INCORRECT_INPUT);
});

test("Wrong y input", () => {
  const wrong_y = "y" as unknown as number;
  const { error } = moveCar(10, wrong_y, 4, 4, WEST, [FORWARD]);

  expect(error).toBe(INCORRECT_INPUT);
});

test("Wrong height input", () => {
  const wrong_height = "height" as unknown as number;
  const { error } = moveCar(10, 10, wrong_height, 4, WEST, [FORWARD]);

  expect(error).toBe(INCORRECT_INPUT);
});

test("Wrong width input", () => {
  const wrong_width = "width" as unknown as number;
  const { error } = moveCar(10, 10, 4, wrong_width, WEST, [FORWARD]);

  expect(error).toBe(INCORRECT_INPUT);
});

test("Wrong width input", () => {
  const wrong_direction = "direction" as unknown as Direction;
  const { error } = moveCar(10, 10, 4, 4, wrong_direction, [FORWARD]);

  expect(error).toBe(INCORRECT_INPUT);
});

test("Empty action input", () => {
  const { error } = moveCar(10, 10, 4, 4, WEST, []);
  expect(error).toBe(INCORRECT_INPUT);
});
