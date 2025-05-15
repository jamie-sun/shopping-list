import { useState } from "react";
import { motion } from "framer-motion";

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

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

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
    setError(null);
    setIsLoadingChecked(true);
    try {
      const response = await updateCompletedItem(id, text, check);
      console.log(response);
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.error("Error updating checked item:", err);
      setError("Failed to update checked item");
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
      <motion.li
        variants={itemVariant}
        className="flex items-center p-2 cursor-pointer rounded-lg transition duration-300"
        onClick={() => {
          toggleCheckedHandler(item.id, item.text, !item.completed);
        }}
      >
        <motion.div
          animate={{ rotate: isCompleted ? 360 : 270 }}
          transition={{ duration: 0.1 }}
          className={`${isCompleted ? "line-through opacity-50" : ""} mr-2.5`}
        >
          {isLoadingChecked ? (
            <SpinnerIcon className="h-[15px]" />
          ) : isCompleted ? (
            <CheckedIcon />
          ) : (
            <UncheckedIcon />
          )}
        </motion.div>
        <span
          className={`${isCompleted ? "line-through opacity-50" : ""} w-full`}
        >
          {item.text}
        </span>
        <button
          disabled={isLoadingDelete}
          className={`${!isLoadingDelete && "hover:text-red-500"} cursor-pointer scale-80 hover:scale-100 p-1 transition-transform duration-300`}
          onClick={(e) => {
            e.stopPropagation();
            removeItemHandler(item.id);
          }}
        >
          {isLoadingDelete ? <SpinnerIcon /> : <DeleteIcon />}
        </button>
      </motion.li>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  );
}
