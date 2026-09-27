export const PAWAT_HOST = "pawat.chat";
export const STOAT_HOST = PAWAT_HOST;
const PAWAT_API = "https://api.pawat.chat";
const STOAT_API = PAWAT_API;

/** App `pawat.json` endpoint format */
export interface AppConfig {
  api: string;
}

/**
 * Fetch env var by name, optionally only when in dev mode.
 * Also prevents compiler from optimizing out injected strings in Docker
 */
const getEnv = (name: string, devOnly?: boolean) =>
  !devOnly || import.meta.env.DEV
    ? (import.meta.env[name] as string)
    : undefined;

/** If host is Pawat, normalize to PAWAT_HOST, else return host */
export const normalizeHost = (host: string) =>
  [
    // historically...
    "api.revolt.chat",
    "beta.revolt.chat",
    "revolt.chat",
    // ... and now:
    "api.pawat.chat",
    "beta.pawat.chat",
  ].includes(host)
    ? PAWAT_HOST
    : host;

const isPawatOfficialAPI = (api: string) =>
  [
    "https://api.revolt.chat",
    "https://api.pawat.chat",
    "https://pawat.chat/api",
    "https://beta.pawat.chat/api",
    "canary-api.pawat.chat",
  ].includes(api);

const DEFAULT_HOST = normalizeHost(
  getEnv("VITE_DEV_HOST", true) || getEnv("VITE_HOST") || PAWAT_HOST,
);

const DEFAULT_API_URL =
  getEnv("VITE_DEV_API_URL", true) || getEnv("VITE_API_URL") || PAWAT_API;

if (!isPawatOfficialAPI(DEFAULT_API_URL) && DEFAULT_HOST === PAWAT_HOST)
  console.error("VITE_HOST required when VITE_API_URL is set!");
  console.error("VITE_HOST required when VITE_API_URL is set!");

export default {
  /** Default instance (without the protocol) */
  DEFAULT_HOST,
  /** API URL of default instance */
  DEFAULT_API_URL,
  /** WS server override for development */
  DEV_WS_URL: getEnv("VITE_DEV_WS_URL"),
  /** Media server override for development */
  DEV_MEDIA_URL: getEnv("VITE_DEV_MEDIA_URL"),
  /** Proxy server override for development */
  DEV_PROXY_URL: getEnv("VITE_DEV_PROXY_URL"),
  /** Gifbox server override for development */
  DEV_GIFBOX_URL: getEnv("VITE_DEV_GIFBOX_URL"),
  /**
   * RNNoise worklet CDN host location. Defaults to blank, which uses the url provided by the livekit-rnnoise-processor package.
   */
  RNNOISE_WORKLET_CDN_URL: getEnv("VITE_RNNOISE_WORKLET_CDN_URL"),
  /**
   * Session ID to set during development.
   */
  DEVELOPMENT_SESSION_ID: getEnv("VITE_SESSION_ID", true),
  /**
   * Token to set during development.
   */
  DEVELOPMENT_TOKEN: getEnv("VITE_TOKEN", true),
  /**
   * User ID to set during development.
   */
  DEVELOPMENT_USER_ID: getEnv("VITE_USER_ID", true),
};
