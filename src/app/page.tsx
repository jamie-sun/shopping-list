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
    <div className="flex flex-col gap-5 items-center m-auto p-10 w-[90%] max-w-[500px] h-[60vh] font-[family-name:var(--font-geist-sans)] rounded-3xl shadow-md">
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
