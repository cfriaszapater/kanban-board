import { authBearerToken } from "../util/authBearerToken";

export async function get(url: string): Promise<any> {
  const req = new Request(url, {
    headers: headers(),
    method: "GET"
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return await res.json();
}

export async function post(url: string, body: any): Promise<any> {
  const req = new Request(url, {
    body: JSON.stringify(body),
    headers: headers(),
    method: "POST"
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return await res.json();
}

export async function put(url: string, body: any): Promise<Response> {
  const req = new Request(url, {
    body: JSON.stringify(body),
    headers: headers(),
    method: "PUT"
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return res;
}

export async function del(url: string): Promise<Response> {
  const req = new Request(url, {
    headers: headers(),
    method: "DELETE"
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return res;
}

function headers(): Headers {
  const result = new Headers();
  result.append("Accept", "application/json");
  result.append("Content-Type", "application/json");
  const bearerToken = authBearerToken();
  if (bearerToken != null) {
    result.append("Authorization", bearerToken);
  }
  return result;
}

async function errorMessage(res: Response) {
  const errorMsg = "Fetch response KO - " + res.status + " " + res.statusText;
  const body = await res.text();
  console.log(errorMsg + " - " + body);
  return errorMsg;
}
