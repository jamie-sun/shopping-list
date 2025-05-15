import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { addShoppingItem } from "@/app/lib/api/api";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { SpinnerIcon } from "@/app/icons/icons";

interface Props {
  list: ShoppingItem[];
  itemAdded: (list: ShoppingItem[]) => void;
  error: string | null;
}

export default function ShoppingInput({ list, itemAdded, error }: Props) {
  const [item, setItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [addItemError, setAddItemError] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputActive &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInputActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputActive]);

  const addItemHandler = async () => {
    console.log(`Adding item: ${item}`);
    setIsLoading(true);
    setAddItemError(null);
    try {
      const addedItemResponse = await addShoppingItem(item);
      const addedItemID = addedItemResponse.id;
      const addedItem = {
        id: addedItemID,
        text: item,
        completed: false,
      };
      const updatedList = [...list, addedItem];
      setItem("");
      itemAdded(updatedList);
      setInputActive(false);
    } catch (err) {
      console.error("Error adding item:", err);
      setAddItemError("Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    !error && (
      <>
        <div
          ref={containerRef}
          className="flex justify-center w-full max-h-[34px]"
        >
          <motion.div
            initial={{ width: "0" }}
            animate={{ width: inputActive ? "80%" : "50%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.1,
            }}
            className="accent-color-wrapper flex items-center rounded-lg overflow-hidden"
            onClick={() => !inputActive && setInputActive(true)}
          >
            {inputActive ? (
              <>
                <input
                  className="flex-grow bg-transparent py-1.5 px-4 focus:outline-none"
                  type="text"
                  value={item}
                  placeholder="add an item..."
                  autoFocus
                  onChange={(event) => setItem(event.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className={`${!item.trim() ? "opacity-50" : "cursor-pointer opacity-100"} px-4 py-1.5`}
                  disabled={isLoading || !item.trim()}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemHandler();
                  }}
                >
                  {isLoading ? <SpinnerIcon /> : "add"}
                </button>
              </>
            ) : (
              <motion.div
                className="cursor-pointer transition duration-300 hover:bg-gray-200 w-full py-1.5 text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1, ease: "easeIn" }}
              >
                add an item...
              </motion.div>
            )}
          </motion.div>
        </div>
        {addItemError && (
          <motion.div
            className="text-red-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {addItemError}
          </motion.div>
        )}
      </>
    )
  );
}
