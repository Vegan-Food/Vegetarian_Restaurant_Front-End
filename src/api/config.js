export const BASE_URL = "https://vegan-backend-server.onrender.com";

export const get = async (endpoint) => {
    const token = localStorage.getItem('token');
    const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
    if (!res.ok) throw new Error("GET API error");
    return res.json();
};

export const post = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("POST API error");
    return res.json();
};

export const put = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("PUT API error");
    return res.json();
};

// Hàm DELETE hỗ trợ truyền body nếu có data, nếu không có thì không truyền body
export const del = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(data && { "Content-Type": "application/json" }),
    };
    const options = {
        method: "DELETE",
        headers,
        ...(data && { body: JSON.stringify(data) }),
    };
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error("DELETE API error");
    return res.json();
};

export const putWithParams = async (endpoint, params = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    // Gắn query string vào endpoint
    const query = new URLSearchParams(params).toString();
    const urlWithParams = `${BASE_URL}${endpoint}?${query}`;

    const res = await fetch(urlWithParams, {
        method: "PUT",
        headers,
    });

    if (!res.ok) throw new Error("PUT API error");
    return res.json();
};

export const delWithParams = async (endpoint, params = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const query = new URLSearchParams(params).toString();
  const urlWithParams = `${BASE_URL}${endpoint}?${query}`;

  const res = await fetch(urlWithParams, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("DELETE API error");
  return res.json();
};
