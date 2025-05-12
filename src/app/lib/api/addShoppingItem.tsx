import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

export default async function addShoppingItem(
  item: string
): Promise<ShoppingItem[]> {
  const data = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Bananas" },
    { id: 3, name: "Carrots" },
  ];

  data.push({ id: 4, name: item });

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Adding shopping item...");
      resolve(data);
    }, 1000);
  });
}
