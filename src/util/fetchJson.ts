import { authBearerToken } from "../util/authBearerToken";

export async function get(url: string): Promise<any> {
  const req = new Request(url, {
    method: "GET",
    headers: headers()
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(await errorMessage(res));
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
    throw new Error(await errorMessage(res));
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
    throw new Error(await errorMessage(res));
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
    throw new Error(await errorMessage(res));
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

async function errorMessage(res: Response) {
  const errorMsg = "Fetch response KO - " + res.status + " " + res.statusText;
  const body = await res.text();
  console.log(errorMsg + " - " + body);
  return errorMsg;
}
