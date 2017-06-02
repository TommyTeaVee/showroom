import * as Response from "../helpers/response";
import consume from "consumers";

describe("Consumers", () => {

  it("should have text as default consumer", () => {
    expect(consume(Response.text())).toEqual('content');
  });

  it("should be able to switch between different types of consumer", () => {
    expect(consume(Response.text(), 'text')).toEqual('content');
    expect(consume(Response.json(), 'json')).toEqual({content: "content"});
    expect(consume(Response.blob(), 'blob')).toEqual('blob');
  });

});
