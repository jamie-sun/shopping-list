export default async function removeShoppingItem(id: string): Promise<string> {
  try {
    const response = await fetch(
      `https://shoppinglist-production-2144.up.railway.app/item/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return id;
  } catch (error) {
    console.error("Error removing shopping item:", error);
    throw error;
  }
}
