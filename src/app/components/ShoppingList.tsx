import React from "react";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

interface ShoppingListProps {
  list: ShoppingItem[];
  loading: boolean;
  error: string | null;
  removeItem: (id: number) => void;
}

export default function ShoppingList({
  list,
  loading,
  error,
  removeItem,
}: ShoppingListProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="w-[500px]">
      {list.map((item) => (
        <li key={item.id} className="flex justify-between items-center p-2">
          {item.text}
          <button
            className="cursor-pointer"
            onClick={() => removeItem(item.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
