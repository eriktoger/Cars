export const NORTH = "N" as const;
export const SOUTH = "S" as const;
export const EAST = "E" as const;
export const WEST = "W" as const;

export const possibleDirections = [NORTH, WEST, SOUTH, EAST] as const;
export const posssibleDirectionsLength = possibleDirections.length;

export const LEFT = "L" as const;
export const RIGHT = "R" as const;
export const FORWARD = "F" as const;
export const BACKWARD = "B" as const;
export const possibleActions = [LEFT, RIGHT, FORWARD, BACKWARD] as const;

export const OUT_OF_BOUND = "Car out of bound" as const;
export const INCORRECT_INPUT = "Incorrect input" as const;

export const INVALID_NUMBERS_WIDTH_HEIGHT_MESSAGE =
  "Invalid input: Width, height must be valid numbers." as const;

export const WIDTH_HEIGHT_MUST_BE_POSITIVE_MESSAGE =
  "Invalid input: Width and height must be positive numbers." as const;

export const INVALID_NUMBERS_X_Y_MESSAGE =
  "Invalid input: X, and y must be valid numbers." as const;

export const X_Y_GREATER_THAN_ZERO_MESSAGE =
  "Invalid input: X and y must be zero or greater." as const;

export const INVALID_DIRECTION_MESSAGE =
  `Invalid input: Direction must be one of ${NORTH}, ${WEST}, ${SOUTH}, ${EAST}.` as const;

export const INVALID_ACTIONS_MESSAGE = `Actions cannot be empty` as const;
