export interface ShoppingItem {
  id: number;
  name: string;
}

export default async function fetchShoppingList(): Promise<ShoppingItem[]> {
  const data = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Bananas" },
    { id: 3, name: "Carrots" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetching shopping list...");
      resolve(data);
    }, 1000);
  });
}
