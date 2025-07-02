export const BASE_URL = "http://localhost:8080";

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

export const del = async (endpoint) => {
    const token = localStorage.getItem('token');
    const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE", headers });
    if (!res.ok) throw new Error("DELETE API error");
    return res.json();
};