import type { ZodType, z } from "zod";
import { createAuthHeaders, extractResponseData, getBaseHeader, makePath, type Credentials } from "./internal";
import { Schema } from "./schema";

const defaultEndpoint = "https://api.bitflyer.com";

export class HttpApi {
  readonly #baseUrl: string;
  readonly #debug: boolean;
  #credentials?: Credentials;

  constructor(config?: { endpoint?: string; debug?: boolean }) {
    this.#baseUrl = config?.endpoint ?? defaultEndpoint;
    this.#debug = config?.debug ?? false;
  }

  async getmarkets() {
    return await this.get({
      path: "/v1/getmarkets",
      schema: Schema.getmarkets,
    });
  }

  async markets() {
    return await this.get({
      path: "/v1/markets",
      schema: Schema.getmarkets,
    });
  }

  async getmarketsUsa() {
    return await this.get({
      path: "/v1/getmarkets/usa",
      schema: Schema.getmarkets,
    });
  }

  async marketsUsa() {
    return await this.get({
      path: "/v1/markets/usa",
      schema: Schema.getmarkets,
    });
  }

  async getmarketsEu() {
    return await this.get({
      path: "/v1/getmarkets/eu",
      schema: Schema.getmarkets,
    });
  }

  async marketsEu() {
    return await this.get({
      path: "/v1/markets/eu",
      schema: Schema.getmarkets,
    });
  }

  async getboard(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/getboard",
      params: params,
      schema: Schema.getboard,
    });
  }

  async board(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/board",
      params: params,
      schema: Schema.getboard,
    });
  }

  async getticker(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/getticker",
      params: params,
      schema: Schema.getticker,
    });
  }

  async ticker(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/ticker",
      params: params,
      schema: Schema.getticker,
    });
  }

  async getexecutions(params: { product_code?: string; count?: number; before?: number; after?: number }) {
    return await this.get({
      path: "/v1/getexecutions",
      params: params,
      schema: Schema.getexecutions,
    });
  }

  async executions(params: { product_code?: string; count?: number; before?: number; after?: number }) {
    return await this.get({
      path: "/v1/executions",
      params: params,
      schema: Schema.getexecutions,
    });
  }

  async getboardstate(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/getboardstate",
      params: params,
      schema: Schema.getboardstate,
    });
  }

  async gethealth(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/gethealth",
      params: params,
      schema: Schema.gethealth,
    });
  }

  async getfundingrate(params: { product_code: string }) {
    return await this.get({
      path: "/v1/getfundingrate",
      params: params,
      schema: Schema.getfundingrate,
    });
  }

  async getcorporateleverage() {
    return await this.get({
      path: "/v1/getcorporateleverage",
      schema: Schema.getcorporateleverage,
    });
  }

  async getchats(params?: { from_date: string }) {
    return await this.get({
      path: "/v1/getchats",
      params: params,
      schema: Schema.getchats,
    });
  }

  async getpermissions() {
    return await this.get({
      auth: true,
      path: "/v1/me/getpermissions",
      schema: Schema.getpermissions,
    });
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
    params?: Record<string, string | number | boolean> | undefined;
    auth?: boolean;
    schema: T;
  }): Promise<z.infer<T>> {
    const pathAndSearch = makePath(path, params);
    const url = `${this.#baseUrl}${pathAndSearch}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "GET", pathAndSearch) : getBaseHeader();

    return await this.#handleResponse(await fetch(url, { headers }), schema);
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

    return await this.#handleResponse(
      await fetch(url, { method: "POST", headers, body: JSON.stringify(body) }),
      schema,
    );
  }

  async #handleResponse<T extends ZodType<any, any, any>>(response: Response, schema: T): Promise<z.infer<T>> {
    if (this.#debug) {
      console.log(`GET: ${response.url}`);
    }

    const result = extractResponseData(await response.text());
    if (this.#debug) {
      console.log(`Result: ${JSON.stringify(result)}`);
    }

    if (!response.ok) {
      // examples:
      //   - { Message: The requested resource does not support http method 'GET'. }
      //   - { status: -122, error_message: 'Empty request body', data: null }
      console.error(result);
      throw result;
    }

    return schema.parse(result);
  }
}
