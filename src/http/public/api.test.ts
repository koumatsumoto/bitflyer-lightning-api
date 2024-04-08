import { HttpPublicApi } from "./api";

describe.skip("HttpPublicApi", () => {
  const api = new HttpPublicApi();

  test("getmarkets", async () => {
    expect(await api.getmarkets()).toStrictEqual([]);
  });

  test("markets", async () => {
    expect(await api.markets()).toStrictEqual([]);
  });

  test("getmarketsUsa", async () => {
    expect(await api.getmarketsUsa()).toStrictEqual([]);
  });

  test("marketsUsa", async () => {
    expect(await api.marketsUsa()).toStrictEqual([]);
  });

  test("getmarketsEu", async () => {
    expect(await api.getmarketsEu()).toStrictEqual([]);
  });

  test("marketsEu", async () => {
    expect(await api.marketsEu()).toStrictEqual([]);
  });

  test("getboard", async () => {
    expect(await api.getboard("BTC_JPY")).toStrictEqual([]);
  });
});
