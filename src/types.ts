import { possibleActions, possibleDirections } from "./constants";

export type Direction = (typeof possibleDirections)[number];
export type Action = (typeof possibleActions)[number];
