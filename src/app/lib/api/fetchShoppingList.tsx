import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

export default async function fetchShoppingList(): Promise<ShoppingItem[]> {
  try {
    const response = await fetch(
      "https://shoppinglist-production-2144.up.railway.app/list",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    throw error;
  }
}
