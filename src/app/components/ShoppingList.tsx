import React from "react";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";
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
    return <div>isLoading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="w-[500px]">
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
