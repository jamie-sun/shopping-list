import { useState } from "react";
import { addShoppingItem } from "@/app/lib/api/api";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

interface Props {
  list: ShoppingItem[];
  itemAdded: (list: ShoppingItem[]) => void;
  addItemError: (error: string | null) => void;
}

export default function ShoppingInput({
  list,
  itemAdded,
  addItemError,
}: Props) {
  const [item, setItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const addItemHandler = async () => {
    console.log(`Adding item: ${item}`);
    setIsLoading(true);
    addItemError(null);
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
    } catch (err) {
      console.error("Error adding item:", err);
      addItemError("Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex gap-2">
        <input
          className="border-1"
          type="text"
          value={item}
          onChange={(event) => {
            setItem(event.target.value);
          }}
        />
        <button disabled={isLoading || !item.trim()} onClick={addItemHandler}>
          {isLoading ? "adding" : "add"}
        </button>
      </div>
    </div>
  );
}
