import { getUserInputs } from "./getUserInputs";
import { moveCar } from "./moveCar";

const { width, height, x, y, direction, actions } = getUserInputs();

const { finalX, finalY, finalDirection, error } = moveCar(
  width,
  height,
  x,
  y,
  direction,
  actions
);

if (error) {
  console.log("Unsuccessful simulation: ", { error });
} else {
  console.log("Successful simulation: ");
}

console.log({ finalX, finalY, finalDirection });
process.exit(0);
