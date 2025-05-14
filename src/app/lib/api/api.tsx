const baseUrl = "https://shoppinglist-production-2144.up.railway.app";

const fetchJSON = async (url: string, config: RequestInit) => {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const getDefaultApiConfig = () => {
  return JSON.parse(
    JSON.stringify({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  );
};

export const fetchShoppingList = () => {
  let config = getDefaultApiConfig();
  config.method = "GET";
  return fetchJSON(`${baseUrl}/list`, config);
};

export const addShoppingItem = (item: string) => {
  let config = getDefaultApiConfig();
  config.method = "POST";
  config.body = JSON.stringify({ text: item });
  return fetchJSON(`${baseUrl}/item`, config);
};

export const removeShoppingItem = (id: string) => {
  let config = getDefaultApiConfig();
  config.method = "DELETE";
  return fetchJSON(`${baseUrl}/item/${id}`, config);
};

export const updateCompletedItem = (id: string) => {
  let config = getDefaultApiConfig();
  config.method = "PUT";
  return fetchJSON(`${baseUrl}/item/${id}`, config);
};
