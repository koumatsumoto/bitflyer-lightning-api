import { createHmac, makeUrl } from "./util";

describe("util", () => {
  test("makeUrl", () => {
    expect(makeUrl("https://example.com/", "path")).toBe("https://example.com/path");
    expect(makeUrl("https://example.com/", "path", {})).toBe("https://example.com/path?");
    expect(makeUrl("https://example.com/", "path", { a: "1" })).toBe("https://example.com/path?a=1");
    expect(makeUrl("https://example.com/", "path", { a: "1", b: "2" })).toBe("https://example.com/path?a=1&b=2");
    expect(makeUrl("https://example.com/", "path", { a: ";,/?:@&=+$-_.!~*'()#ABC abc 123" })).toBe(
      "https://example.com/path?a=%3B%2C%2F%3F%3A%40%26%3D%2B%24-_.%21%7E*%27%28%29%23ABC+abc+123",
    );
  });

  test("createHmac", async () => {
    expect(await createHmac("secret", "message")).toBe(
      "8b5f48702995c1598c573db1e21866a9b825d4a794d169d7060a03605796360b",
    );
  });
});
