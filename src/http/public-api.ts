import { HttpPublicClient } from "./client";

const defaultEndpoint = "https://api.bitflyer.com";

export class HttpPublicApi {
  readonly #client: HttpPublicClient;

  constructor(config?: { endpoint?: string }) {
    this.#client = new HttpPublicClient(config?.endpoint ?? defaultEndpoint);
  }

  async getmarkets() {
    return await this.#client.get("/v1/getmarkets");
  }

  async markets() {
    return await this.#client.get("/v1/markets");
  }

  async getmarketsUsa() {
    return await this.#client.get("/v1/getmarkets/usa");
  }

  async marketsUsa() {
    return await this.#client.get("/v1/markets/usa");
  }

  async getmarketsEu() {
    return await this.#client.get("/v1/getmarkets/eu");
  }

  async marketsEu() {
    return await this.#client.get("/v1/markets/eu");
  }

  async getboard(productCode: string) {
    return await this.#client.get("/v1/getboard", { product_code: productCode });
  }
}
