export async function get(url: string): Promise<any> {
  const req = new Request(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error("Could not get resource, response KO: " + res);
  }
  return await res.json();
}

export async function post(url: string, body: any): Promise<any> {
  const req = new Request(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
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
    headers: {
      Accept: "application/json"
    }
  });
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(
      "Could not update card, response KO: " + JSON.stringify(res)
    );
  }
  return res;
}
