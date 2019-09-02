export function backendUrl() {
  var devUrl = "http://localhost:8080";
  return process.env.REACT_APP_BACKEND_URL || devUrl;
}
