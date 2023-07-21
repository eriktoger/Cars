import { EAST, NORTH, SOUTH, WEST } from "./constants";
import { Action, Direction } from "./types";

const prompt = require("prompt-sync")({ sigint: true });

export function getUserInputs(promptFn = prompt) {
  const roomInput = promptFn("Room input (width height): ") ?? "";
  const [widthString, heightString, ...restRI] = roomInput.split(" ");
  const width = Number(widthString);
  const height = Number(heightString);
  if (isNaN(width) || isNaN(height)) {
    console.error("Invalid input: Width, height must be valid numbers.");
    process.exit(1);
  }
  if (width <= 0 || height <= 0) {
    console.error("Invalid input: Width and height must be positive numbers.");
    process.exit(1);
  }

  const startinInput =
    promptFn("Starting position and direction of a car (x y direction): ") ??
    "";
  const [xString, yString, directionString, ...restSI] =
    startinInput.split(" ");
  let x = Number(xString);
  let y = Number(yString);
  let direction = directionString?.toUpperCase() as Direction;

  if (isNaN(width) || isNaN(height) || isNaN(x) || isNaN(y)) {
    console.error("Invalid input: X, and y must be valid numbers.");
    process.exit(1);
  }

  if (x < 0 || y < 0) {
    console.error("Invalid input: X and y must be zero or greater.");
    process.exit(1);
  }

  if (![NORTH, WEST, SOUTH, WEST].includes(direction)) {
    console.error(
      `Invalid input: Direction must be one of ${NORTH}, ${WEST}, ${SOUTH}, ${EAST}.`
    );
    process.exit(1);
  }

  const squenceInput =
    promptFn("A sequence of action commands (F B L R): ") ?? "";
  const actions: Action[] = squenceInput.toUpperCase().split(" ");

  return { width, height, x, y, direction, actions };
}
