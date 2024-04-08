import { createHmac, getUnixTimestamp, makeUrl } from "./util";

class HttpClient {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = makeUrl(this.#baseUrl, path, params);
    const response = await fetch(url, await this.#createHeaders());
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  }

  async #createHeaders(): Promise<Record<string, string>> {
    return {};
  }
}

export class HttpPublicClient extends HttpClient {
  // @ts-ignore TS6133
  async #createHeaders(): Promise<Record<string, string>> {
    return {
      "Content-Type": "application/json",
    };
  }
}

export class HttpPrivateClient extends HttpClient {
  readonly #apiKey: string;
  readonly #apiSecret: string;

  constructor(baseUrl: string, apiKey: string, apiSecret: string) {
    super(baseUrl);
    this.#apiKey = apiKey;
    this.#apiSecret = apiSecret;
  }

  // @ts-ignore TS6133
  async #createHeaders(method: "GET" | "POST", path: string, body?: Record<string, any>) {
    const timestamp = getUnixTimestamp().toString();
    const message = `${timestamp}${method}${path}${body ?? ""}`;

    return {
      "Content-Type": "application/json",
      "ACCESS-KEY": this.#apiKey,
      "ACCESS-TIMESTAMP": timestamp,
      "ACCESS-SIGN": await createHmac(this.#apiSecret, message),
    };
  }
}
