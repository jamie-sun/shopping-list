import { useState } from "react";

import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { removeShoppingItem, updateCompletedItem } from "@/app/lib/api/api";
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
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingChecked, setIsLoadingChecked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(item.completed);

  // toggle completed state
  const toggleCheckedHandler = async (
    id: string,
    text: string,
    check: boolean
  ) => {
    console.log(`Item with id ${id} toggled`);
    setIsLoadingChecked(true);
    try {
      const reponse = await updateCompletedItem(id, text, check);
      console.log(reponse);
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.error("Error updating checked item:", err);
    } finally {
      setIsLoadingChecked(false);
    }
  };

  // remove item from the list
  const removeItemHandler = async (id: string) => {
    console.log(`Item with id ${id} removed from the list`);
    setError(null);
    setIsLoadingDelete(true);
    try {
      await removeShoppingItem(id);
      onRemoveItemID(id);
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <>
      <li
        className="flex items-center p-2 cursor-pointer bg-white hover:bg-gray-100"
        onClick={() => {
          toggleCheckedHandler(item.id, item.text, !item.completed);
        }}
      >
        <div
          className={`${isCompleted ? "line-through opacity-50" : ""} mr-2.5`}
        >
          {isLoadingChecked ? (
            <SpinnerIcon className="h-[15px]" />
          ) : isCompleted ? (
            <CheckedIcon />
          ) : (
            <UncheckedIcon />
          )}
        </div>
        <div
          className={`${isCompleted ? "line-through opacity-50" : ""} w-full`}
        >
          {item.text}
        </div>
        <button
          disabled={isLoadingDelete}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            removeItemHandler(item.id);
          }}
        >
          {isLoadingDelete ? <SpinnerIcon /> : <DeleteIcon />}
        </button>
      </li>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}
