import { HttpPrivateApi } from "./private-api";

describe.skip("HttpPrivateApi", () => {
  const api = new HttpPrivateApi({
    apiKey: "",
    apiSecret: "",
  });

  test("getpermissions", async () => {
    expect(await api.getpermissions()).toStrictEqual([]);
  });
});
