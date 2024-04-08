export function makeUrl(baseUrl: string, path: string, searchParams?: Record<string, string | number | boolean>) {
  return searchParams ? `${baseUrl}${path}?${stringifySearchParams(searchParams)}` : `${baseUrl}${path}`;
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

  return toHex(signature);
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export function getUnixTimestamp() {
  return Date.now();
}
