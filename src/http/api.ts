import type { ZodType, z } from "zod";
import { createAuthHeaders, getBaseHeader, handleResponse, makePath, type Credentials } from "./internal";
import { Schema } from "./schema";

const defaultEndpoint = "https://api.bitflyer.com";

export class HttpApi {
  readonly #baseUrl: string;
  #credentials?: Credentials;

  constructor(config?: { endpoint?: string }) {
    this.#baseUrl = config?.endpoint ?? defaultEndpoint;
  }

  async getmarkets() {
    return await this.get({ path: "/v1/getmarkets", schema: Schema.getmarkets });
  }

  async markets() {
    return await this.get({ path: "/v1/markets", schema: Schema.getmarkets });
  }

  async getmarketsUsa() {
    return await this.get({ path: "/v1/getmarkets/usa", schema: Schema.getmarkets });
  }

  async marketsUsa() {
    return await this.get({ path: "/v1/markets/usa", schema: Schema.getmarkets });
  }

  async getmarketsEu() {
    return await this.get({ path: "/v1/getmarkets/eu", schema: Schema.getmarkets });
  }

  async marketsEu() {
    return await this.get({ path: "/v1/markets/eu", schema: Schema.getmarkets });
  }

  async getboard(productCode: string) {
    return await this.get({ path: "/v1/getboard", params: { product_code: productCode }, schema: Schema.getboard });
  }

  async getpermissions() {
    return await this.get({ path: "/v1/me/getpermissions", auth: true, schema: Schema.getpermissions });
  }

  async cancelchildorder(body: { product_code: string; child_order_id: string }) {
    return await this.post({ path: "/v1/me/cancelallchildorders", body, auth: true, schema: Schema.cancelchildorder });
  }

  async cancelallchildorders(body: { product_code: string }) {
    return await this.post({ path: "/v1/me/cancelallchildorders", body, auth: true, schema: Schema.cancelchildorder });
  }

  setCredentials(credentials: Credentials) {
    this.#credentials = credentials;
  }

  async get<T extends ZodType<any, any, any>>({
    path,
    params,
    auth,
    schema,
  }: {
    path: string;
    params?: Record<string, string | number | boolean>;
    auth?: boolean;
    schema: T;
  }): Promise<z.infer<T>> {
    const pathAndSearch = makePath(path, params);
    const url = `${this.#baseUrl}${pathAndSearch}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "GET", pathAndSearch) : getBaseHeader();

    const response = await fetch(url, { headers });
    const result = await handleResponse(response);

    return schema.parse(result);
  }

  async post<T extends ZodType<any, any, any>>({
    path,
    body,
    auth,
    schema,
  }: {
    path: string;
    body?: Record<string, string | number | boolean>;
    auth?: boolean;
    schema: T;
  }): Promise<T> {
    const url = `${this.#baseUrl}${path}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "POST", path, body) : getBaseHeader();

    const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
    const result = await handleResponse(response);

    return schema.parse(result);
  }
}
