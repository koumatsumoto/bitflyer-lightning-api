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

  setCredentials(credentials: Credentials) {
    this.#credentials = credentials;
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
      schema: Schema.getboard,
      params,
    });
  }

  async board(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/board",
      schema: Schema.getboard,
      params,
    });
  }

  async getticker(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/getticker",
      schema: Schema.getticker,
      params,
    });
  }

  async ticker(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/ticker",
      schema: Schema.getticker,
      params,
    });
  }

  async getexecutions(params: { product_code?: string; count?: number; before?: number; after?: number }) {
    return await this.get({
      path: "/v1/getexecutions",
      schema: Schema.getexecutions,
      params,
    });
  }

  async executions(params: { product_code?: string; count?: number; before?: number; after?: number }) {
    return await this.get({
      path: "/v1/executions",
      schema: Schema.getexecutions,
      params,
    });
  }

  async getboardstate(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/getboardstate",
      schema: Schema.getboardstate,
      params,
    });
  }

  async gethealth(params: { product_code?: string }) {
    return await this.get({
      path: "/v1/gethealth",
      schema: Schema.gethealth,
      params,
    });
  }

  async getfundingrate(params: { product_code: string }) {
    return await this.get({
      path: "/v1/getfundingrate",
      schema: Schema.getfundingrate,
      params,
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
      schema: Schema.getchats,
      params,
    });
  }

  async getpermissions() {
    return await this.get({
      auth: true,
      path: "/v1/me/getpermissions",
      schema: Schema.getpermissions,
    });
  }

  async getbalance() {
    return await this.get({
      auth: true,
      path: "/v1/me/getbalance",
      schema: Schema.getbalance,
    });
  }

  async getcollateral() {
    return await this.get({
      auth: true,
      path: "/v1/me/getcollateral",
      schema: Schema.getcollateral,
    });
  }

  async getcollateralaccounts() {
    return await this.get({
      auth: true,
      path: "/v1/me/getcollateralaccounts",
      schema: Schema.getcollateralaccounts,
    });
  }

  async getaddresses() {
    return await this.get({
      auth: true,
      path: "/v1/me/getaddresses",
      schema: Schema.getaddresses,
    });
  }

  async getcoinins(params?: { count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getcoinins",
      schema: Schema.getcoininouts,
      params,
    });
  }

  async getcoinouts(params?: { count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getcoinouts",
      schema: Schema.getcoininouts,
      params,
    });
  }

  async getbankaccounts() {
    return await this.get({
      auth: true,
      path: "/v1/me/getbankaccounts",
      schema: Schema.getbankaccounts,
    });
  }

  async getdeposits(params?: { count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getdeposits",
      schema: Schema.getdeposits,
      params,
    });
  }

  async withdraw(params: { currency_code: string; bank_account_id: number; amount: number; code: string }) {
    return await this.post({
      auth: true,
      path: "/v1/me/withdraw",
      schema: Schema.withdraw,
      params,
    });
  }

  async getwithdrawals(params?: { count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getwithdrawals",
      schema: Schema.getdeposits,
      params,
    });
  }

  async sendchildorder(params: {
    product_code: string;
    child_order_type: "LIMIT" | "MARKET";
    side: "BUY" | "SELL";
    price?: number;
    size: number;
    minute_to_expire?: number;
    time_in_force?: "GTC" | "IOC" | "FOK";
  }) {
    return await this.post({
      auth: true,
      path: "/v1/me/sendchildorder",
      schema: Schema.sendchildorder,
      params,
    });
  }

  async cancelchildorder(params: { product_code: string; child_order_id: string }) {
    return await this.post({
      auth: true,
      path: "/v1/me/cancelallchildorders",
      schema: Schema.cancelchildorder,
      params,
    });
  }

  async sendparentorder(params: {
    order_method: "SIMPLE" | "IFD" | "OCO" | "IFDOCO";
    minute_to_expire?: number;
    time_in_force?: "GTC" | "IOC" | "FOK";
    parameters: {
      product_code: string;
      condition_type: "LIMIT" | "MARKET" | "STOP" | "STOP_LIMIT" | "TRAIL";
      side: "BUY" | "SELL";
      price?: number;
      size: number;
      trigger_price?: number;
      offset?: number;
    }[];
  }) {
    return await this.post({
      auth: true,
      path: "/v1/me/sendparentorder",
      schema: Schema.sendparentorder,
      params,
    });
  }

  async cancelparentorder(params: { product_code: string; parent_order_id: string }) {
    return await this.post({
      auth: true,
      path: "/v1/me/cancelparentorder",
      schema: Schema.cancelparentorder,
      params,
    });
  }

  async cancelallchildorders(params: { product_code: string }) {
    return await this.post({
      auth: true,
      path: "/v1/me/cancelallchildorders",
      schema: Schema.cancelchildorder,
      params,
    });
  }

  async getparentorders(params: {
    product_code: string;
    count?: number;
    before?: number;
    after?: number;
    parent_order_state?: "ACTIVE" | "COMPLETED" | "CANCELED" | "EXPIRED" | "REJECTED";
  }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getparentorders",
      schema: Schema.getparentorders,
      params,
    });
  }

  async getparentorder(params: { parent_order_id?: string; parent_order_acceptance_id?: string }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getparentorder",
      schema: Schema.getparentorder,
      params,
    });
  }

  async getchildexecutions(params: {
    product_code: string;
    count?: number;
    before?: number;
    after?: number;
    child_order_id?: string;
    child_order_acceptance_id?: string;
  }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getexecutions",
      schema: Schema.getchildexecutions,
      params,
    });
  }

  async getbalancehistory(params: { currency_code: string; count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getbalancehistory",
      schema: Schema.getbalancehistory,
      params,
    });
  }

  async getpositions(params: { product_code: string }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getpositions",
      schema: Schema.getpositions,
      params,
    });
  }

  async getcollateralhistory(params?: { count?: number; before?: number; after?: number }) {
    return await this.get({
      auth: true,
      path: "/v1/me/getcollateralhistory",
      schema: Schema.getcollateralhistory,
      params,
    });
  }

  async gettradingcommission(params: { product_code: string }) {
    return await this.get({
      auth: true,
      path: "/v1/me/gettradingcommission",
      schema: Schema.gettradingcommission,
      params,
    });
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
    params,
    auth,
    schema,
  }: {
    path: string;
    params?: Record<string, string | number | boolean | object>;
    auth?: boolean;
    schema: T;
  }): Promise<T> {
    const url = `${this.#baseUrl}${path}`;
    const headers = auth ? await createAuthHeaders(this.#credentials!, "POST", path, params) : getBaseHeader();

    return await this.#handleResponse(
      await fetch(url, { method: "POST", headers, body: JSON.stringify(params) }),
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
