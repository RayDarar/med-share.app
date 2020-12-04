const key = "token";

export function getToken() {
  const token = localStorage.getItem(key);
  if (token) return token;
  return sessionStorage.getItem(key);
}

export function setToken(token: string, permanent = false) {
  if (permanent) {
    localStorage.setItem(key, token);
  } else {
    sessionStorage.setItem(key, token);
  }
}
