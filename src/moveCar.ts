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
  possibleDirections,
  posssibleDirectionsLength,
} from "./constants";
import { Action, Direction } from "./types";

function calcOutOfBound(x: number, y: number, width: number, height: number) {
  return x < 0 || x >= width || y < 0 || y >= height;
}

export function moveCar(
  width: number,
  height: number,
  x: number,
  y: number,
  direction: Direction,
  actions: Action[]
) {
  let error = null;

  const incorrectInput =
    isNaN(width) ||
    isNaN(height) ||
    isNaN(x) ||
    isNaN(y) ||
    !possibleDirections.find((d) => d === direction) ||
    !actions.length;

  if (incorrectInput) {
    return {
      finalX: 0,
      finalY: 0,
      finalDirection: NORTH,
      error: INCORRECT_INPUT,
    };
  }

  for (const action of actions) {
    if (calcOutOfBound(x, y, width, height)) {
      error = OUT_OF_BOUND;
      break;
    }

    if (action === LEFT || action === RIGHT) {
      const step = action === LEFT ? 1 : posssibleDirectionsLength - 1;
      direction =
        possibleDirections[
          (possibleDirections.findIndex((pd) => pd === direction) + step) %
            posssibleDirectionsLength
        ];
    }

    if (action === FORWARD || action === BACKWARD) {
      const movement = action === FORWARD ? 1 : -1;
      if (direction === NORTH) {
        y += movement;
      } else if (direction === EAST) {
        x += movement;
      } else if (direction === SOUTH) {
        y -= movement;
      } else if (direction === WEST) {
        x -= movement;
      }
    }
  }

  if (calcOutOfBound(x, y, width, height)) {
    error = OUT_OF_BOUND;
  }

  return { finalX: x, finalY: y, finalDirection: direction, error };
}
