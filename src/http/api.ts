import { createAuthHeaders, getBaseHeader, handleResponse, makePath, type Credentials } from "./internal";

const defaultEndpoint = "https://api.bitflyer.com";

export class HttpApi {
  readonly #baseUrl: string;
  #credentials?: Credentials;

  constructor(config?: { endpoint?: string }) {
    this.#baseUrl = config?.endpoint ?? defaultEndpoint;
  }

  async getmarkets() {
    return await this.get({ path: "/v1/getmarkets" });
  }

  async markets() {
    return await this.get({ path: "/v1/markets" });
  }

  async getmarketsUsa() {
    return await this.get({ path: "/v1/getmarkets/usa" });
  }

  async marketsUsa() {
    return await this.get({ path: "/v1/markets/usa" });
  }

  async getmarketsEu() {
    return await this.get({ path: "/v1/getmarkets/eu" });
  }

  async marketsEu() {
    return await this.get({ path: "/v1/markets/eu" });
  }

  async getboard(productCode: string) {
    return await this.get({ path: "/v1/getboard", params: { product_code: productCode } });
  }

  async getpermissions() {
    return await this.get({ path: "/v1/me/getpermissions", auth: true });
  }

  async cancelchildorder(body: { product_code: string; child_order_id: string }) {
    return await this.post({ path: "/v1/me/cancelallchildorders", body, auth: true });
  }

  async cancelallchildorders(body: { product_code: string }) {
    return await this.post({ path: "/v1/me/cancelallchildorders", body, auth: true });
  }

  setCredentials(credentials: Credentials) {
    this.#credentials = credentials;
  }

  async get<T>({
    path,
    params,
    auth,
  }: {
    path: string;
    params?: Record<string, string | number | boolean>;
    auth?: boolean;
  }): Promise<T> {
    const pathAndSearch = makePath(path, params);
    const url = `${this.#baseUrl}${pathAndSearch}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "GET", pathAndSearch) : getBaseHeader();

    const response = await fetch(url, { headers });
    const result = handleResponse(response);

    return result;
  }

  async post<T>({
    path,
    body,
    auth,
  }: {
    path: string;
    body?: Record<string, string | number | boolean>;
    auth?: boolean;
  }): Promise<T> {
    const url = `${this.#baseUrl}${path}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "POST", path, body) : getBaseHeader();

    const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
    const result = handleResponse(response);

    return result;
  }
}
