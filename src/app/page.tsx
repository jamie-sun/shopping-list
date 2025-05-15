"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import ShoppingInput from "@/app/components/ShoppingInput";
import ShoppingList from "@/app/components/ShoppingList";
import { fetchShoppingList } from "@/app/lib/api/api";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { LightIcon, DarkIcon } from "@/app/icons/icons";

export default function Home() {
  const [list, setList] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { theme, setTheme } = useTheme();

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
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchShoppingList();
      console.log("Fetched shopping list data:", data);
      setList(data);
    } catch (err) {
      console.error("Error fetching shopping list:", err);
      setError("failed to load shopping list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`flex flex-col gap-5 items-center m-auto p-10 w-[90%] max-w-[500px] h-[60vh] font-[family-name:var(--font-poppins)] rounded-3xl shadow-md bg-[var(--foreground)]`}
    >
      <div className="flex justify-between w-full overflow-hidden">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          shopping list
        </motion.h1>
        <motion.button
          key={theme}
          initial={{ rotate: 270 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <LightIcon /> : <DarkIcon />}
        </motion.button>
      </div>
      <div className=" w-full border-b-1 border-gray-200"></div>
      <ShoppingInput list={list} itemAdded={itemAddedHandler} error={error} />
      <ShoppingList
        list={list}
        isLoading={isLoading}
        error={error}
        removeItemID={removeItemIDHandler}
        tryAgainHandler={fetchData}
      />
    </div>
  );
}
