import { getWebSocket } from "./get-websocket";

describe("getWebSocket", () => {
  test("create instance", () => {
    const websocket = getWebSocket("wss://ws.lightstream.bitflyer.com/json-rpc");
    expect(websocket).toBeDefined();
  });
});
