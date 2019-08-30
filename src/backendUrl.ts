export function backendUrl() {
  var devUrl = "http://localhost:8080";
  return process.env.BACKEND_URL || devUrl;
}
