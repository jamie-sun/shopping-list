import { useState } from "react";

import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { removeShoppingItem } from "@/app/lib/api/api";
import {
  SpinnerIcon,
  CheckedIcon,
  UncheckedIcon,
  DeleteIcon,
} from "@/app/icons/icons";

interface Props {
  item: ShoppingItem;
  onRemoveItemID: (id: string) => void;
}

export default function ShoppingListItem({ item, onRemoveItemID }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(item.completed);

  // toggle completed state
  const toggleCheckedHandler = () => {
    console.log(`Item with id ${item.id} toggled`);
    setIsCompleted(!isCompleted);
  };

  // remove item from the list
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
      <li
        className="flex items-center p-2 cursor-pointer bg-white hover:bg-gray-100"
        onClick={() => {
          toggleCheckedHandler();
        }}
      >
        <div
          className={`${isCompleted ? "line-through opacity-50" : ""} mr-2.5`}
        >
          {isCompleted ? <CheckedIcon /> : <UncheckedIcon />}
        </div>
        <div
          className={`${isCompleted ? "line-through opacity-50" : ""} w-full`}
        >
          {item.text}
        </div>
        <button
          disabled={isLoading}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            removeItemHandler(item.id);
          }}
        >
          {isLoading ? <SpinnerIcon /> : <DeleteIcon />}
        </button>
      </li>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}
