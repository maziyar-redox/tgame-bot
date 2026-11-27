// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        SERVERLESS_TOKEN: string;
        BOT_TOKEN: string;
        ADMIN_ID: string;
    }
}