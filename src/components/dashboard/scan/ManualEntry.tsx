// src/components/scan/ManualEntry.tsx

import { useState } from "react";

interface ManualEntryProps {
  onLookup: (barcode: string) => void;
}

export const ManualEntry = ({ onLookup }: ManualEntryProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onLookup(value.trim());
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6"
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Manual Entry</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter barcode manually"
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200"
        >
          Lookup
        </button>
      </div>
    </form>
  );
};
