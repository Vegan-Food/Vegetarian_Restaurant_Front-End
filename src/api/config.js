export const BASE_URL = "http://localhost:8080";

export const get = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("GET API error");
    return res.json();
};

export const post = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("POST API error");
    return res.json();
};

export const put = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("PUT API error");
    return res.json();
};

export const del = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE" });
    if (!res.ok) throw new Error("DELETE API error");
    return res.json();
};