import { HttpClient } from "./client";

const defaultEndpoint = "https://api.bitflyer.com/v1/";

export class HttpPublicApi {
  readonly #client: HttpClient;

  constructor(config?: { endpoint?: string }) {
    this.#client = new HttpClient(config?.endpoint ?? defaultEndpoint);
  }

  async getmarkets() {
    return await this.#client.get("getmarkets");
  }

  async markets() {
    return await this.#client.get("markets");
  }

  async getmarketsUsa() {
    return await this.#client.get("getmarkets/usa");
  }

  async marketsUsa() {
    return await this.#client.get("markets/usa");
  }

  async getmarketsEu() {
    return await this.#client.get("getmarkets/eu");
  }

  async marketsEu() {
    return await this.#client.get("markets/eu");
  }

  async getboard(productCode: string) {
    return await this.#client.get("getboard", { product_code: productCode });
  }
}
