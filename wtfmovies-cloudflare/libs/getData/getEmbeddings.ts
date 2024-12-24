import { env } from "../func";

export async function getEmbedding(model: string, input: any) {
    const response = await fetch(
        `${env?.URL_CLOUDFLARE_MODEL}${model}`,
        {
            headers: { Authorization: env?.CLOUDFLARE_AI_TOKEN },
            method: 'POST',
            body: JSON.stringify(input),
        },
    );
    const result = await response.json();
    return result;
}
