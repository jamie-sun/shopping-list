import { useState } from "react";
import addShoppingItem from "@/app/lib/api/addShoppingItem";
import { ShoppingItem } from "@/app/lib/types/ShoppingItem";

interface ShoppingInputProps {
  itemAdded: (list: ShoppingItem[]) => void;
  addItemError: (error: string | null) => void;
}

export default function ShoppingInput({
  itemAdded,
  addItemError,
}: ShoppingInputProps) {
  const [item, setItem] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const addItemHandler = async () => {
    console.log(`Adding item: ${item}`);
    setLoading(true);
    addItemError(null);
    try {
      const updatedList = await addShoppingItem(item);
      setItem("");
      itemAdded(updatedList);
    } catch (err) {
      console.error("Error adding item:", err);
      addItemError("Failed to add item");
    } finally {
      setLoading(false);
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
        <button disabled={loading || !item.trim()} onClick={addItemHandler}>
          {loading ? "adding" : "add"}
        </button>
      </div>
    </div>
  );
}
