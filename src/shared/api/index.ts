const BASE = "https://recruit.paysbypays.com/api/v1";

export async function api(path: string) {
    const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
    return res.json();
}