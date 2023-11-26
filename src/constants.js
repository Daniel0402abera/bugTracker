// export const baseURL = "http://localhost:9191";

export const configHeader = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.get("access_token")} `,
  },
};
