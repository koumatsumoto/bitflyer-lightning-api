import { setTimeout } from "node:timers/promises";
import { RealtimeApi } from "./api";

describe("RealtimeApi", () => {
  describe("public channels", () => {
    test("subscribeBoardSnapshot", async () => {
      const api = new RealtimeApi();
      await api.connect();
      await api.subscribeBoardSnapshot("BTC_JPY", (data) => {
        console.log(data);
      });
      await setTimeout(3000);
    });
  });

  describe.skip("private channels", () => {
    test("for local", async () => {
      const credentials = {
        apiKey: process.env["TEST_API_KEY"] ?? "",
        apiSecret: process.env["TEST_API_SECRET"] ?? "",
      };
      const api = new RealtimeApi();
      await api.connect();
      await api.auth(credentials);
      await setTimeout(1000);
    });
  });
});
