"use client";

import { useState, useEffect } from "react";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminAuth = getCookie("admin-auth");
    setIsAdmin(!!adminAuth);
  }, []);

  return isAdmin;
}
