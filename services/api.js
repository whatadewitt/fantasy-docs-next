export function api(endpoint, data) {
  const BASE_URL = "/api/yahoo"; //`https://www.fantasyanalyzer.local/api`;

  return fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      console.error("Fetch Error :-S", err);
      return err;
    });
}
