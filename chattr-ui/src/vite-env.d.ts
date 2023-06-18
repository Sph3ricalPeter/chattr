/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string,
  readonly VITE_API_PORT: string,
  readonly VITE_SOCKET_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}