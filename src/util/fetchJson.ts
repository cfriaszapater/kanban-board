import { authBearerToken } from "../util/authBearerToken";

export async function get(url: string): Promise<any> {
  const req = new Request(url, {
    method: "GET",
    headers: headers()
  });
  const res = await fetch(req);
  if (!res.ok) {
    const body = await res.text();
    console.log(body);
    throw new Error(
      "Could not get resource, response KO: " +
        res.status +
        " " +
        res.statusText
    );
  }
  return await res.json();
}

export async function post(url: string, body: any): Promise<any> {
  const req = new Request(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error("Could not post resource, response KO: " + res);
  }
  return await res.json();
}

export async function put(url: string, body: any): Promise<Response> {
  const req = new Request(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body)
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(
      "Could not update card, response KO: " + JSON.stringify(res)
    );
  }
  return res;
}

export async function del(url: string): Promise<Response> {
  const req = new Request(url, {
    method: "DELETE",
    headers: headers()
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(
      "Could not update card, response KO: " + JSON.stringify(res)
    );
  }
  return res;
}

function headers(): Headers {
  var headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  const bearerToken = authBearerToken();
  if (bearerToken != null) {
    headers.append("Authorization", bearerToken);
  }
  return headers;
}
