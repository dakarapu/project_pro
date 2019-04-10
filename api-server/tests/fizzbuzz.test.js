import { fizzBuzz } from "./fizzbuzz";

describe("testing fizzBuzz function", () => {
  it("input not a number", () => {
    expect(() => {
      fizzBuzz("a"); // testing the not a number exception case here.
    }).toThrow();

    expect(() => {
      fizzBuzz(null); // testing the null exception case here.
    }).toThrow();

    expect(() => {
      fizzBuzz(undefined); // testing the undefined exception case here.
    }).toThrow();

    expect(() => {
      fizzBuzz({}); // testing the not a number exception case here.
    }).toThrow();

    expect(() => {
      fizzBuzz(false); // testing the false exception case here.
    }).toThrow();
  });
  it("number divisible by both 3 and 5", () => {
    expect(fizzBuzz(15)).toMatch(/FizzBuzz/); // testing a string here.
  });

  it("number divisible by only 3", () => {
    expect(fizzBuzz(6)).toMatch(/Fizz/);
  });
  it("number divisible by only 5", () => {
    expect(fizzBuzz(15)).toMatch(/Buzz/);
  });
  it("number not divisible by both 3 and 5", () => {
    expect(fizzBuzz(2)).toBe(2); // testing a number here.
  });
});
