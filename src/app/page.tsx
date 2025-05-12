"use client";

import { useEffect, useState } from "react";

import ShoppingInput from "@/app/components/ShoppingInput";
import ShoppingList from "@/app/components/ShoppingList";
import fetchShoppingList from "@/app/lib/api/fetchShoppingList";
import removeShippingItem from "@/app/lib/api/removeShoppingItem";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

export default function Home() {
  const [list, setList] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add shopping item
  const itemAddedHandler = (list: ShoppingItem[]) => {
    setList(list);
  };

  const addItemErrorHandler = (error: string) => {
    setError(error);
  };

  // Remove shopping item
  const removeItemHandler = async (id: number) => {
    console.log(`Item with id ${id} removed from the list`);
    setLoading(true);
    setError(null);
    try {
      const updatedList = await removeShippingItem(id);
      setList(updatedList);
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  // Fetch shopping list data
  const fetchData = async () => {
    fetchShoppingList()
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shopping list:", err);
        setError("Failed to fetch shopping list");
        setLoading(false);
      })
      .finally(() => {
        console.log("Fetch shopping list completed");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="">shopping list</div>
      <ShoppingInput
        itemAdded={itemAddedHandler}
        addItemError={addItemErrorHandler}
      />
      <ShoppingList
        list={list}
        loading={loading}
        error={error}
        removeItem={removeItemHandler}
      />
    </div>
  );
}
