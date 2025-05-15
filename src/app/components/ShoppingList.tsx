import React from "react";
import { motion } from "framer-motion";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { SpinnerIcon } from "@/app/icons/icons";
import ShoppingListItem from "@/app/components/ShoppingListItem";

interface Props {
  list: ShoppingItem[];
  isLoading: boolean;
  error: string | null;
  removeItemID: (id: string) => void;
  tryAgainHandler: () => void;
}

const listVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export default function ShoppingList({
  list,
  isLoading,
  error,
  removeItemID,
  tryAgainHandler,
}: Props) {
  if (isLoading) {
    return (
      <div className="m-auto text-[var(--color-text)]">
        <SpinnerIcon className="h-[30px] w-[30px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 m-auto items-center">
        <p>Error: {error}</p>
        <button
          onClick={tryAgainHandler}
          className="accent-color-wrapper p-2 px-4 mx-auto rounded-lg cursor-pointer hover:opacity-50"
        >
          Retry
        </button>
        <p className="text-xs w-[80%] opacity-50 text-center">
          Note: due to the free version of Railway {" :'( "} , the server needs
          to wake up after long periods of inactivity.
        </p>
      </div>
    );
  }

  return (
    <motion.ul
      className="flex flex-col gap-2.5 max-w-[500px] w-full overflow-y-auto"
      variants={listVariant}
      initial="hidden"
      animate="show"
    >
      {list.map((item, i) => (
        <ShoppingListItem key={i} item={item} onRemoveItemID={removeItemID} />
      ))}
    </motion.ul>
  );
}
