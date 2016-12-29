import * as Builder from "../helpers/builder";
import ReferenceComponent from "components/reference-component";

describe("Reference", () => {
  it("should store a showroom as a target referencing the id", () => {
    const [s1, s2, s3] = Builder.multipleIdShowrooms(3);
    const ref = Builder.reference();

    assert.equal(ref.target.id, "showroom-1");
  });
});
