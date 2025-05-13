import { useState } from "react";

import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { removeShoppingItem } from "@/app/lib/api/api";

interface Props {
  item: ShoppingItem;
  onRemoveItemID: (id: string) => void;
}

export default function ShoppingListItem({ item, onRemoveItemID }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(item.completed);

  const toggleCheckedHandler = () => {
    console.log(`Item with id ${item.id} toggled`);
    setIsCompleted(!isCompleted);
  };

  const removeItemHandler = async (id: string) => {
    console.log(`Item with id ${id} removed from the list`);
    setError(null);
    setIsLoading(true);
    try {
      await removeShoppingItem(id);
      onRemoveItemID(id);
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <li className="flex items-center p-2">
        <div onClick={toggleCheckedHandler}>{isCompleted ? "Y" : "N"}</div>
        <span className={`${isCompleted ? "line-through" : ""}`}>
          {item.text}
        </span>
        <button
          disabled={isLoading}
          className="cursor-pointer ml-auto"
          onClick={() => removeItemHandler(item.id)}
        >
          {isLoading ? "removing" : "x"}
        </button>
      </li>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}
