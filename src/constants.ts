export const NORTH = "N";
export const SOUTH = "S";
export const EAST = "E";
export const WEST = "W";

export const possibleDirections = [NORTH, WEST, SOUTH, EAST] as const;
export const posssibleDirectionsLength = possibleDirections.length;

export const LEFT = "L";
export const RIGHT = "R";
export const FORWARD = "F";
export const BACKWARD = "B";
export const possibleActions = [LEFT, RIGHT, FORWARD, BACKWARD] as const;

export const OUT_OF_BOUND = "Car out of bound";
export const INCORRECT_INPUT = "Incorrect input";
