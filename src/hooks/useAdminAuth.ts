import { useState } from 'react';
import { storageGet, storageSet } from '../lib/storage';

const AUTH_KEY = 'an_tattoo_admin_auth';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(storageGet<string>(AUTH_KEY, '')),
  );

  function login(pin: string): boolean {
    const correctPin = import.meta.env.VITE_ADMIN_PIN ?? '1234';
    if (pin === correctPin) {
      storageSet(AUTH_KEY, '1');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout(): void {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }

  return { isAuthenticated, login, logout };
}
