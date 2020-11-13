import { strict as assert } from "assert";
import { a } from "../hello";

describe("NETAPI Unit Test", function () {
  it("test for fun", function () {
    assert.equal(a, 3);
  });
  it("autre test", function () {
    assert.ok("super");
  });
  it("last test", function () {
    assert.ok("super");
  });
});
