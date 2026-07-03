function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function useAuth() {
  const token = localStorage.getItem("token");
  if (!token) return { user: null, role: null, isAdmin: false, isEmployee: false };

  const payload = parseJwt(token);
  const role = payload?.role ?? null;

  return {
    user: payload,
    role,
    isAdmin: role === "ADMIN",
    isEmployee: role === "EMPLOYEE",
    isClient: role === "CLIENT",
  };
}
