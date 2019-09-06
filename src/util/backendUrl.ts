export function backendUrl() {
  let devUrl = "http://localhost:8080";
  return process.env.REACT_APP_BACKEND_URL || devUrl;
}
