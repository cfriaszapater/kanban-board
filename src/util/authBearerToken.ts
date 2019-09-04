export function authBearerToken() {
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    // return authorization header with jwt token
    let user = JSON.parse(loggedInUser);

    if (user && user.token) {
      return "Bearer " + user.token;
    }
  }
  return null;
}
