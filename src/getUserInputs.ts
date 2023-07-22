import {
  EAST,
  INVALID_ACTIONS_MESSAGE,
  INVALID_DIRECTION_MESSAGE,
  INVALID_NUMBERS_WIDTH_HEIGHT_MESSAGE,
  INVALID_NUMBERS_X_Y_MESSAGE,
  NORTH,
  SOUTH,
  WEST,
  WIDTH_HEIGHT_MUST_BE_POSITIVE_MESSAGE,
  X_Y_GREATER_THAN_ZERO_MESSAGE,
  possibleActions,
} from "./constants";
import { Action, Direction } from "./types";
import promptSync from "prompt-sync";

const prompt = promptSync({
  sigint: true,
});

export function getUserInputs(promptFn = prompt) {
  const roomInput = promptFn("Room input (width height): ") ?? "";
  const [widthString, heightString, ...restRI] = roomInput.split(" ");
  const width = Number(widthString);
  const height = Number(heightString);
  if (isNaN(width) || isNaN(height)) {
    console.error(INVALID_NUMBERS_WIDTH_HEIGHT_MESSAGE);
    process.exit(1);
  }
  if (width <= 0 || height <= 0) {
    console.error(WIDTH_HEIGHT_MUST_BE_POSITIVE_MESSAGE);
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

  if (isNaN(x) || isNaN(y)) {
    console.error(INVALID_NUMBERS_X_Y_MESSAGE);
    process.exit(1);
  }

  if (x < 0 || y < 0) {
    console.error(X_Y_GREATER_THAN_ZERO_MESSAGE);
    process.exit(1);
  }

  if (![NORTH, WEST, SOUTH, EAST].includes(direction)) {
    console.error(INVALID_DIRECTION_MESSAGE);
    process.exit(1);
  }

  const squenceInput =
    promptFn("A sequence of action commands (F B L R): ") ?? "";
  const actions = squenceInput
    .toUpperCase()
    .split(" ")
    .filter((action: string) =>
      possibleActions.find((pa) => pa === action)
    ) as Action[];

  if (!actions.length) {
    console.error(INVALID_ACTIONS_MESSAGE);
    process.exit(1);
  }

  return { width, height, x, y, direction, actions };
}
