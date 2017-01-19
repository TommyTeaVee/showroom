import * as Builder from "../../helpers/builder";
import ReferenceComponent from "components/reference-component";

describe("Reference", () => {
  it("should store a showroom as a target referencing the id", () => {
    const [s1, s2, s3] = Builder.multipleIdShowrooms(3);
    const ref = Builder.reference();

    assert.equal(ref.target.id, "showroom-1");
  });

  it("should open a the showroom referenced in the target", (done) => {
    const [showroom, items] = Builder.fullShowroom();
    const ref = Builder.reference();

    showroom.template = "<p>{{content}}</p>";
    showroom._fetch = () => "content";

    ref.open(items[0]).done(() => {
      assert.isTrue(showroom.isOpen);
      done();
    });
  });
});
