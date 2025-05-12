import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

export default async function removeShoppingItem(
  id: number
): Promise<ShoppingItem[]> {
  const data = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Bananas" },
    { id: 3, name: "Carrots" },
  ].filter((item) => item.id !== id);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Removing shopping item...");
      resolve(data);
    }, 1000);
  });
}
