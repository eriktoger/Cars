import { BACKWARD, FORWARD, LEFT, NORTH, RIGHT } from "./constants";
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

  test("should log an error and exit when width or height is not a number", () => {
    mockPromptFn.mockReturnValueOnce("invalid width 5");

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid input: Width, height must be valid numbers."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("should log an error and exit when width or height is not positive", () => {
    mockPromptFn.mockReturnValueOnce("-5 10").mockReturnValueOnce("10 0");

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid input: Width and height must be positive numbers."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("should log an error and exit when x or y is not a number", () => {
    mockPromptFn.mockReturnValueOnce("5 5").mockReturnValueOnce("invalid x 10");

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid input: X, and y must be valid numbers."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("should log an error and exit when x or y is negative", () => {
    mockPromptFn.mockReturnValueOnce("5 5").mockReturnValueOnce("-2 0");

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid input: X and y must be zero or greater."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test("should log an error and exit when direction is invalid", () => {
    mockPromptFn
      .mockReturnValueOnce("5 5")
      .mockReturnValueOnce("2 3 invalidDirection");

    try {
      getUserInputs(mockPromptFn);
    } catch (error: any) {
      expect(error.message).toBe("process.exit was called.");
    }

    expect(mockPromptFn).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid input: Direction must be one of N, W, S, E."
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
