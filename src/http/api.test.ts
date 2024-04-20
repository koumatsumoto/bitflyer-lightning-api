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

    test("getbalance", async () => {
      await expect(api.getbalance()).resolves.not.toThrow();
    });

    test("getcollateral", async () => {
      await expect(api.getcollateral()).resolves.not.toThrow();
    });

    test("getcollateralaccounts", async () => {
      await expect(api.getcollateralaccounts()).resolves.not.toThrow();
    });

    test("getaddresses", async () => {
      await expect(api.getaddresses()).resolves.not.toThrow();
    });

    test("getcoinins", async () => {
      await expect(api.getcoinins()).resolves.not.toThrow();
    });

    test("getcoinouts", async () => {
      await expect(api.getcoinouts()).resolves.not.toThrow();
    });

    test("getbankaccounts", async () => {
      await expect(api.getbankaccounts()).resolves.not.toThrow();
    });

    test("getdeposits", async () => {
      await expect(api.getdeposits()).resolves.not.toThrow();
    });

    test("getwithdrawals", async () => {
      await expect(api.getwithdrawals()).resolves.not.toThrow();
    });

    test("withdraw", async () => {
      await expect(
        api.withdraw({
          currency_code: "JPY",
          bank_account_id: 1234,
          amount: 10000,
          code: "000000",
        }),
      ).resolves.not.toThrow();
    });

    test("sendchildorder", async () => {
      await expect(
        api.sendchildorder({
          product_code: "BTC_JPY",
          child_order_type: "LIMIT",
          side: "BUY",
          price: 1000000,
          size: 0.01,
        }),
      ).resolves.not.toThrow();
    });

    test("cancelchildorder", async () => {
      await expect(api.cancelchildorder({ product_code: "BTC_JPY", child_order_id: "id" })).resolves.not.toThrow();
    });

    test("sendparentorder", async () => {
      await expect(
        api.sendparentorder({
          order_method: "IFDOCO",
          minute_to_expire: 1,
          time_in_force: "GTC",
          parameters: [
            {
              product_code: "BTC_JPY",
              condition_type: "LIMIT",
              side: "BUY",
              price: 30000,
              size: 0.1,
            },
            {
              product_code: "BTC_JPY",
              condition_type: "LIMIT",
              side: "SELL",
              price: 32000,
              size: 0.1,
            },
            {
              product_code: "BTC_JPY",
              condition_type: "STOP_LIMIT",
              side: "SELL",
              price: 28800,
              trigger_price: 29000,
              size: 0.1,
            },
          ],
        }),
      ).resolves.not.toThrow();
    });

    test("cancelparentorder", async () => {
      await expect(api.cancelparentorder({ product_code: "BTC_JPY", parent_order_id: "id" })).resolves.not.toThrow();
    });

    test("cancelallchildorders", async () => {
      await expect(api.cancelallchildorders({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getparentorders", async () => {
      await expect(api.getparentorders({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getparentorder", async () => {
      await expect(api.getparentorder({ parent_order_id: "id" })).resolves.not.toThrow();
    });

    test("getchildexecutions", async () => {
      await expect(api.getchildexecutions({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });

    test("getbalancehistory", async () => {
      await expect(api.getbalancehistory({ currency_code: "JPY" })).resolves.not.toThrow();
    });

    test("getpositions", async () => {
      await expect(api.getpositions({ product_code: "FX_BTC_JPY" })).resolves.not.toThrow();
    });

    test("getcollateralhistory", async () => {
      await expect(api.getcollateralhistory()).resolves.not.toThrow();
    });

    test("gettradingcommission", async () => {
      await expect(api.gettradingcommission({ product_code: "BTC_JPY" })).resolves.not.toThrow();
    });
  });
});
