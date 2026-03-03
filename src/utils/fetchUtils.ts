export async function retry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 1000,
): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    if (retries === 0) throw err;

    // 재시도
    if (err?.status === 503 || err?.status === 429) {
      await new Promise((res) => setTimeout(res, delay));
      return retry(fn, retries - 1, delay * 2); // exponential backoff
    }

    throw err;
  }
}
