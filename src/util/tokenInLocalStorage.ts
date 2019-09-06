export function tokenInLocalStorage() {
  const token = localStorage.getItem("token");
  console.log("tokenInLocalStorage", token);
  return token;
}

export function storeTokenInLocalStorage(token: string) {
  console.log("storeTokenInLocalStorage", token);
  localStorage.setItem("token", token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}
