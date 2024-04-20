import { describe } from "vitest";
import { HttpApi } from "./api";

describe.skip("HttpApi", () => {
  const api = new HttpApi();

  describe("Public", () => {
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

  describe("Private", () => {
    const api = new HttpApi();
    api.setCredentials({
      apiKey: process.env["TEST_API_KEY"] ?? "",
      apiSecret: process.env["TEST_API_SECRET"] ?? "",
    });

    test("getpermissions", async () => {
      expect(await api.getpermissions()).toStrictEqual([]);
    });

    test("cancelchildorder", async () => {
      expect(await api.cancelchildorder({ product_code: "BTC_JPY", child_order_id: "hoge" })).toStrictEqual([]);
    });

    test("cancelallchildorders", async () => {
      expect(await api.cancelallchildorders({ product_code: "BTC_JPY" })).toStrictEqual([]);
    });
  });
});
