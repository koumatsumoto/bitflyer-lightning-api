import { Client } from "jsonrpc2-ws";
import { createHmac, type Credentials } from "../http/internal";

const defaultEndpoint = "wss://ws.lightstream.bitflyer.com/json-rpc";

export class RealtimeApi {
  #client: Client;
  readonly #subscriptions = new Map<string, ((data: object) => void)[]>();

  constructor(config?: { endpoint?: string; debug?: boolean }) {
    this.#client = new Client(config?.endpoint ?? defaultEndpoint, {
      autoConnect: false,
      protocols: ["wss"],
    });
    this.#client.methods.set("channelMessage", (_, params) => {
      const handlers = this.#subscriptions.get(params.channel) ?? [];
      for (const handler of handlers) {
        try {
          handler(params.message as any);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  async connect() {
    await this.#client.connect();
  }

  async auth(credentials: Credentials) {
    await this.#client.call("auth", await createAuthParams(credentials.apiKey, credentials.apiSecret));
  }

  async subscribeBoardSnapshot(productCode: string, handler: (data: object) => void) {
    const channel = `lightning_board_snapshot_${productCode}`;
    await this.#subscribe(channel, handler);
  }

  async subscribeBoard(productCode: string, handler: (data: object) => void) {
    const channel = `lightning_board_${productCode}`;
    await this.#subscribe(channel, handler);
  }

  async subscribeTicker(productCode: string, handler: (data: object) => void) {
    const channel = `lightning_ticker_${productCode}`;
    await this.#subscribe(channel, handler);
  }

  async subscribeExecutions(productCode: string, handler: (data: object) => void) {
    const channel = `lightning_executions_${productCode}`;
    await this.#subscribe(channel, handler);
  }

  async subscribeChildOrderEvents(handler: (data: object) => void) {
    const channel = `parent_order_events`;
    await this.#subscribe(channel, handler);
  }

  async subscribeParentOrderEvents(handler: (data: object) => void) {
    const channel = `child_order_events`;
    await this.#subscribe(channel, handler);
  }

  async #subscribe(channel: string, handler: (data: object) => void) {
    this.#subscriptions.set(channel, [...(this.#subscriptions.get(channel) ?? []), handler]);
    await this.#client.call("subscribe", { channel });
  }
}

async function createAuthParams(key: string, secret: string) {
  const now = Date.now();
  const nonce = crypto.randomUUID();
  const sign = await createHmac(secret, `${now}${nonce}`);

  return {
    api_key: key,
    timestamp: now,
    nonce: nonce,
    signature: sign,
  };
}
