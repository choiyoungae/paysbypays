const BASE = "https://recruit.paysbypays.com/api/v1";

export async function api<T = any>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("API Error");
    }
    return res.json() as Promise<T>;
}
