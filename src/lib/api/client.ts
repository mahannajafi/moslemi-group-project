export type ApiError = {
  status: number;
  message: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!baseUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
}

const getAccessToken = () => {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("auth_access_token") ?? undefined;
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("auth_refresh_token") ?? undefined;
};

export const getStoredUser = <T>() => {
  if (typeof window === "undefined") return undefined;
  const raw = localStorage.getItem("auth_user");
  return raw ? (JSON.parse(raw) as T) : undefined;
};

export const storeAuthSession = (session: {
  accessToken: string;
  refreshToken: string;
  user: unknown;
}) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_access_token", session.accessToken);
  localStorage.setItem("auth_refresh_token", session.refreshToken);
  localStorage.setItem("auth_user", JSON.stringify(session.user));
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_access_token");
  localStorage.removeItem("auth_refresh_token");
  localStorage.removeItem("auth_user");
};

const buildHeaders = (useAuth?: boolean, extra?: HeadersInit) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(extra || {}),
  };

  if (apiKey) {
    headers.apikey = apiKey;
  }

  if (useAuth) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

export const apiFetch = async <T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
) => {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.auth, options.headers),
  });

  if (!response.ok) {
    const message = await response.text();
    const error: ApiError = {
      status: response.status,
      message: message || "Request failed",
    };
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export const apiFetchForm = async <T>(
  path: string,
  formData: FormData,
  options: RequestInit & { auth?: boolean } = {},
) => {
  return apiFetch<T>(path, {
    method: "POST",
    body: formData,
    ...options,
  });
};
