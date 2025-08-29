export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = new Error("Login failed");
    (error as any).response = res;
    throw error;
  }

  const data = await res.json();
  return data; 
}

export async function logoutAdmin() {
  return true;
}
