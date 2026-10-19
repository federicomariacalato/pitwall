const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export type JolpicaError = Error & { status: number };

function createJolpicaError(message: string, status: number): JolpicaError {
  return Object.assign(new Error(message), { name: "JolpicaError", status });
}

export function isJolpicaError(error: unknown): error is JolpicaError {
  return error instanceof Error && error.name === "JolpicaError";
}

export async function jolpicaFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    const reason =
      response.status === 429
        ? "Rate limit exceeded, try again in a moment"
        : `Request failed: ${response.status} ${response.statusText}`;
    throw createJolpicaError(reason, response.status);
  }

  return (await response.json()) as T;
}
