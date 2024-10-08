export interface Credentials {
  apiKey: string;
  apiSecret: string;
}

export function makePath(path: string, searchParams?: Record<string, string | number | boolean>) {
  return searchParams ? `${path}?${stringifySearchParams(searchParams)}` : path;
}

function stringifySearchParams(params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    searchParams.append(k, String(v));
  }
  return searchParams.toString();
}

export async function createHmac(secret: string, body: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));

  return toHexString(signature);
}

function toHexString(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export function getUnixTimestamp() {
  return Date.now();
}

export function getBaseHeader() {
  return {
    "Content-Type": "application/json",
  } as const;
}

export async function createAuthHeaders(
  credentials: Credentials,
  method: "GET" | "POST",
  path: string,
  params?: Record<string, any>,
): Promise<Record<string, string>> {
  const timestamp = getUnixTimestamp().toString();
  const message = `${timestamp}${method}${path}${params ? JSON.stringify(params) : ""}`;

  return {
    ...getBaseHeader(),
    "ACCESS-KEY": credentials.apiKey,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-SIGN": await createHmac(credentials.apiSecret, message),
  } as const;
}
