import { immunize } from "./tokens";

test("Tokens should be consistant", () => {
    expect(immunize).toEqual(Symbol.for("immunize"));
})
