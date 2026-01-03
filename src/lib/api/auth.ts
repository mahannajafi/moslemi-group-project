import { apiFetch, clearAuthSession, getRefreshToken, storeAuthSession } from "@/lib/api/client";

export type ApiUser = {
  id: string;
  email: string;
  role: "admin" | "agent" | "viewer";
  is_active: boolean;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  user: ApiUser;
};

export const signInWithPassword = async (email: string, password: string) => {
  const response = await apiFetch<TokenResponse>(
    "/auth/v1/token?grant_type=password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        grant_type: "password",
      }),
    },
  );

  storeAuthSession({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    user: response.user,
  });

  return response.user;
};

export const signOut = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearAuthSession();
    return;
  }

  await apiFetch<void>("/auth/v1/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    auth: true,
  });

  clearAuthSession();
};
