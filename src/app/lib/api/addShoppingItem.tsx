export default async function addShoppingItem(item: string): Promise<string> {
  try {
    const response = await fetch(
      "https://shoppinglist-production-2144.up.railway.app/item",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: item }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error adding shopping item:", error);
    throw error;
  }
}
