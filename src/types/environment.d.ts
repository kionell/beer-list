/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BEERS_PER_PAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
