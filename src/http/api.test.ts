import { describe } from "vitest";
import { HttpApi } from "./api";

describe("HttpApi", () => {
  const api = new HttpApi({ debug: true });

  describe("Public", () => {
    test("getmarkets", async () => {
      await expect(api.getmarkets()).resolves.not.toThrow();
    });

    test("markets", async () => {
      await expect(api.markets()).resolves.not.toThrow();
    });

    test("getmarketsUsa", async () => {
      await expect(api.getmarketsUsa()).resolves.not.toThrow();
    });

    test("marketsUsa", async () => {
      await expect(api.marketsUsa()).resolves.not.toThrow();
    });

    test("getmarketsEu", async () => {
      await expect(api.getmarketsEu()).resolves.not.toThrow();
    });

    test("marketsEu", async () => {
      await expect(api.marketsEu()).resolves.not.toThrow();
    });

    test("getboard", async () => {
      await expect(api.getboard({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("board", async () => {
      await expect(api.board({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getticker", async () => {
      await expect(api.getticker({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("ticker", async () => {
      await expect(api.getticker({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getexecutions", async () => {
      await expect(api.getexecutions({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("executions", async () => {
      await expect(api.executions({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getboardstate", async () => {
      await expect(api.getboardstate({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("gethealth", async () => {
      await expect(api.gethealth({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getfundingrate", async () => {
      await expect(api.getfundingrate({ product_code: "FX_BTC_JPY" })).resolves.not.toThrow();
    });

    test("getcorporateleverage", async () => {
      await expect(api.getcorporateleverage()).resolves.not.toThrow();
    });

    test("getchats", async () => {
      await expect(api.getchats()).resolves.not.toThrow();
    });
  });

  describe.skip("Private", () => {
    const api = new HttpApi({ debug: true });
    api.setCredentials({
      apiKey: process.env["TEST_API_KEY"] ?? "",
      apiSecret: process.env["TEST_API_SECRET"] ?? "",
    });

    test("getpermissions", async () => {
      await expect(api.getpermissions()).resolves.not.toThrow();
    });

    test("cancelchildorder", async () => {
      await expect(api.cancelchildorder({ product_code: "BTC_JPY", child_order_id: "id" })).resolves.not.toThrow();
    });

    test("cancelallchildorders", async () => {
      await expect(api.cancelallchildorders({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });
  });
});
