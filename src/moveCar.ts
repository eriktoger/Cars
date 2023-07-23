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

  let error = null;
  let currentX = x;
  let currentY = y;
  let currentDirection = direction;

  for (const action of actions) {
    if (calcOutOfBound(currentX, currentY, width, height)) {
      error = OUT_OF_BOUND;
      break;
    }

    if (action === LEFT || action === RIGHT) {
      const step = action === LEFT ? 1 : posssibleDirectionsLength - 1;
      currentDirection =
        possibleDirections[
          (possibleDirections.findIndex((pd) => pd === currentDirection) +
            step) %
            posssibleDirectionsLength
        ];
    }

    if (action === FORWARD || action === BACKWARD) {
      const movement = action === FORWARD ? 1 : -1;
      if (currentDirection === NORTH) {
        currentY += movement;
      } else if (currentDirection === EAST) {
        currentX += movement;
      } else if (currentDirection === SOUTH) {
        currentY -= movement;
      } else if (currentDirection === WEST) {
        currentX -= movement;
      }
    }
  }

  if (calcOutOfBound(currentX, currentY, width, height)) {
    error = OUT_OF_BOUND;
  }

  return {
    finalX: currentX,
    finalY: currentY,
    finalDirection: currentDirection,
    error,
  };
}
