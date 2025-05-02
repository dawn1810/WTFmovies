export async function getEmbedding(model: string, input: any) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/041b13f2e524a3d3a8744e2e3bf2917c/ai/run/${model}`,
        {
            headers: { Authorization: 'Bearer eU1WAu_OL-kTkpcXHldim8hWDsqVCkMmR--gmpBP' },
            method: 'POST',
            body: JSON.stringify(input),
        },
    );
    const result = await response.json();
    return result;
}
