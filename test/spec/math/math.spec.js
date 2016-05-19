import {calcCircumference} from "math/math";

describe("Math", () => {
  it("Should calculate the cirumference correctly based on radius", () => {
    assert.equal(calcCircumference(200), 1256.637061436)
  });
});
