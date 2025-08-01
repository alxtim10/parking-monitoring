"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

type Slot = {
  slot_id: string;
  row: number;
  column: number;
  orientation: "horizontal" | "vertical";
};

const ParkingLot = () => {
  const [slots, setSlots] = useState<Slot[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Slot>(worksheet);

      setSlots(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div className="mt-4 grid grid-cols-10 gap-2">
        {slots.map((slot) => (
          <div
            key={slot.slot_id}
            className={`p-2 border rounded text-center ${slot.orientation === "horizontal"
                ? "col-span-2 row-span-1"
                : "col-span-1 row-span-2"
              }`}
            style={{
              gridColumnStart: slot.column,
              gridRowStart: slot.row,
            }}
          >
            {slot.slot_id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingLot;
