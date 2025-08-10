import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

if (!baseURL) {
  console.warn("[axios] NEXT_PUBLIC_API_URL is empty");
}

const instance = axios.create({
  baseURL,
  // withCredentials: false, // ajusta si tu API usa cookies
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// opcional: logs de error útiles en prod
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    // eslint-disable-next-line no-console
    console.error("[axios] error:", err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default instance;
