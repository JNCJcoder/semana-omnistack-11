const generateUniqueId = require("../../src/Utils/generateUniqueId");

describe("Generate Unique ID", () => {
  it("should generate an unique ID", () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
