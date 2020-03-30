export function tokenInLocalStorage() {
  const token = localStorage.getItem("token");
  return token;
}

export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}
