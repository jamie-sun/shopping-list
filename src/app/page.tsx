"use client";

import { useEffect, useState } from "react";

import ShoppingInput from "@/app/components/ShoppingInput";
import ShoppingList from "@/app/components/ShoppingList";
import { fetchShoppingList } from "@/app/lib/api/api";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

export default function Home() {
  const [list, setList] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add shopping item
  const itemAddedHandler = (list: ShoppingItem[]) => {
    setList(list);
  };

  // Remove shopping item
  const removeItemIDHandler = async (id: string) => {
    console.log(`Item with id ${id} removed from the list`);
    setList(list.filter((item) => item.id !== id));
  };

  // Fetch shopping list data
  const fetchData = async () => {
    try {
      const data = await fetchShoppingList();
      console.log("Fetched shopping list data:", data);
      setList(data);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
      setError("Failed to load shopping list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="">shopping list</div>
      <ShoppingInput
        list={list}
        itemAdded={itemAddedHandler}
        addItemError={() => setError(error)}
      />
      <ShoppingList
        list={list}
        isLoading={isLoading}
        error={error}
        removeItemID={removeItemIDHandler}
      />
    </div>
  );
}
