interface Cache {
    [key: string]: {
        value: any;
        expirationTime: number;
    };
}

export default class CacheManager {
    private static instance: CacheManager;
    private cache: Cache = {};

    private constructor() {}

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    public async set<T>(key: string, value: T, expirationInSeconds: number): Promise<void> {
        this.cache[key] = {
            value,
            expirationTime: Date.now() + expirationInSeconds * 1000,
        };

        setTimeout(() => {
            delete this.cache[key];
        }, expirationInSeconds * 1000);
    }

    public get<T>(key: string): T | null {
        const cachedValue = this.cache[key];
        if (cachedValue && cachedValue.expirationTime > Date.now()) {
            return cachedValue.value as T;
        }
        return null;
    }
}
