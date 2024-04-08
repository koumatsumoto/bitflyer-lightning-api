import { HttpPrivateClient } from "./client";

const defaultEndpoint = "https://api.bitflyer.com";

export class HttpPrivateApi {
  readonly #client: HttpPrivateClient;

  constructor(config: { endpoint?: string; apiKey: string; apiSecret: string }) {
    this.#client = new HttpPrivateClient(config?.endpoint ?? defaultEndpoint, config.apiKey, config.apiSecret);
  }

  async getpermissions() {
    return await this.#client.get("/v1/me/getpermissions");
  }
}
