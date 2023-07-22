import {
  BACKWARD,
  FORWARD,
  INVALID_ACTIONS_MESSAGE,
  INVALID_DIRECTION_MESSAGE,
  INVALID_NUMBERS_WIDTH_HEIGHT_MESSAGE,
  INVALID_NUMBERS_X_Y_MESSAGE,
  LEFT,
  NORTH,
  RIGHT,
  WIDTH_HEIGHT_MUST_BE_POSITIVE_MESSAGE,
  X_Y_GREATER_THAN_ZERO_MESSAGE,
} from "./constants";
import { getUserInputs } from "./getUserInputs";
const prompt = require("prompt-sync")();

describe("getUserInputs", () => {
  let mockPromptFn: jest.Mock<any, any, any>;

  beforeEach(() => {
    console.error = jest.fn();
    process.exit = jest.fn(() => {
      throw new Error("process.exit was called.");
    });
    mockPromptFn = jest.fn();
  });

  test("should parse valid inputs correctly", () => {
    const promptFn = jest.fn();
    promptFn
      .mockReturnValueOnce("5 5")
      .mockReturnValueOnce(`2 3 ${NORTH}`)
      .mockReturnValueOnce(`${FORWARD} ${BACKWARD} ${LEFT} ${RIGHT}`);

    const result = getUserInputs(promptFn);

    expect(result.width).toBe(5);
    expect(result.height).toBe(5);
    expect(result.x).toBe(2);
    expect(result.y).toBe(3);
    expect(result.direction).toBe(NORTH);
    expect(result.actions).toEqual([FORWARD, BACKWARD, LEFT, RIGHT]);
  });

  const testErrorScenario = (input: string[], expectedErrorMessage: string) => {
    for (const value of input) {
      mockPromptFn.mockReturnValueOnce(value);
    }

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(input.length);
    expect(console.error).toHaveBeenCalledWith(expectedErrorMessage);
    expect(process.exit).toHaveBeenCalledWith(1);
  };

  test("should log an error and exit when width or height is not a number", () => {
    testErrorScenario(
      ["invalid-width 5"],
      INVALID_NUMBERS_WIDTH_HEIGHT_MESSAGE
    );
  });

  test("should log an error and exit when width or height is not positive", () => {
    testErrorScenario(["-5 10"], WIDTH_HEIGHT_MUST_BE_POSITIVE_MESSAGE);
  });

  test("should log an error and exit when x or y is not a number", () => {
    testErrorScenario(["5 5", "invalid-x 10"], INVALID_NUMBERS_X_Y_MESSAGE);
  });

  test("should log an error and exit when x or y is negative", () => {
    testErrorScenario(["5 5", "-2 1"], X_Y_GREATER_THAN_ZERO_MESSAGE);
  });

  test("should log an error and exit when direction is invalid", () => {
    testErrorScenario(
      ["5 5", "2 3 invalidDirection"],
      INVALID_DIRECTION_MESSAGE
    );
  });

  test("should log an error and exit when actions are invalid", () => {
    testErrorScenario(["5 5", "2 3 N", ""], INVALID_ACTIONS_MESSAGE);
  });
});
