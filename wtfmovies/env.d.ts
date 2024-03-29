interface CloudflareEnv {
    URL_Endpoint: string;
    APIKey: string;
    publicKey: string;
    privateKey: string;
    AUTH_SECRET: string;
    // Add here the Cloudflare Bindings you want to have available in your application
    // (for more details on Bindings see: https://developers.cloudflare.com/pages/functions/bindings/)
    //
    // KV Example:
    // MY_KV: KVNamespace
}
