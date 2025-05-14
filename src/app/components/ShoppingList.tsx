import React from "react";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
import { SpinnerIcon } from "@/app/icons/icons";
import ShoppingListItem from "@/app/components/ShoppingListItem";

interface Props {
  list: ShoppingItem[];
  isLoading: boolean;
  error: string | null;
  removeItemID: (id: string) => void;
}

export default function ShoppingList({
  list,
  isLoading,
  error,
  removeItemID,
}: Props) {
  if (isLoading) {
    return (
      <div className="m-auto">
        <SpinnerIcon className="h-[30px] w-[30px]" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="max-w-[500px] w-full overflow-y-auto">
      {list.map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          onRemoveItemID={removeItemID}
        />
      ))}
    </ul>
  );
}
