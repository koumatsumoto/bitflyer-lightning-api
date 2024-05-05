import { isNode } from "./is-node";

export function getWebSocket(url: string): WebSocket {
  if (isNode()) {
    return new (require("ws") as any)(url);
  } else {
    return new WebSocket(url);
  }
}
