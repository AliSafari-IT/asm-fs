/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PORT: string;
    // Add other environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
