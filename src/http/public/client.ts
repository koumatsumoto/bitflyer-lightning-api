export class HttpClient {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async get(path: string, params?: Record<string, string | number | boolean>) {
    const url = makeUrl(this.#baseUrl, path, params);
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  }

  async post() {}
}

function makeUrl(baseUrl: string, path: string, searchParams?: Record<string, string | number | boolean>) {
  return searchParams ? `${baseUrl}${path}?${stringifySearchParams(searchParams)}` : `${baseUrl}${path}`;
}

function stringifySearchParams(params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    searchParams.append(k, String(v));
  }
  return searchParams.toString();
}
