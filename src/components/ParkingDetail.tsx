"use client";
import { parking_plan, places } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import * as XLSX from "xlsx";

type Spot = { row: number; col: number; code: string; available: boolean };
type ApiSlot = {
  slot_code: string;
  available: boolean;
};

interface ParkingDetailProps {
  id: number;
}

export default function ParkingDetail({ id }: ParkingDetailProps) {
  const router = useRouter();
  const [token, setToken] = useState<string>();
  const ws = useRef<WebSocket | null>(null);

  const [spots, setSpots] = useState<Spot[]>([]);

  const boxSizeVW = 9; // box size in vw units
  const maxRow = Math.max(...spots.map(s => s.row));
  const maxCol = Math.max(...spots.map(s => s.col));
  const containerWidthVW = (maxCol + 1) * boxSizeVW;
  const containerHeightVW = (maxRow + 1) * boxSizeVW;

  useEffect(() => {
    const loadExcelAndSlots = async () => {
      if (!token) return;

      if (!token) return;

      // Load layout from Excel
      const res = await fetch("/PARKIR.xlsx");
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = XLSX.utils.decode_range(sheet["!ref"]!);

      let parsedSpots: Spot[] = [];
      for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {
          const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[cellRef];
          if (cell && String(cell.v).trim() !== "") {
            parsedSpots.push({
              row: R,
              col: C,
              code: String(cell.v).trim(),
              available: true,
            });
          }
        }
      }

      // Fetch slot availability
      const response = await fetch(
        `https://valet-production.up.railway.app/api/place/floor/getbyid`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "6cf0674c-441f-4487-85be-9420e30f9de6",
          }),
        }
      );
      const data = await response.json();
      const apiSlots = data.data[0].slots as ApiSlot[];
      const availabilityMap = new Map(apiSlots.map(s => [s.slot_code, s.available]));

      const merged = parsedSpots.map((spot) => ({
        ...spot,
        available: availabilityMap.get(spot.code) ?? true,
      }));

      setSpots(merged);
    };

    loadExcelAndSlots();
  }, [token]);


  useEffect(() => {
    let message = {
      text: "Waiting for parking slot update..",
    };
    ws.current = new WebSocket(
      "wss://valet-production.up.railway.app?clientId=7cb81015-c630-4094-977d-f0392069ce14"
    );

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current?.send(JSON.stringify(message));
    };

    ws.current.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if ((parsed.type = "broadcast_update")) {
          let ads = JSON.parse(event.data);
          setSpots((prev) =>
            prev.map((slot) => {
              const found = ads.data.find(
                (update: any) => update.slot_code === slot.code
              );
              if (found) {
                return { ...slot, available: found.available };
              }
              return slot;
            })
          );
        }
      } catch (error) {
        return;
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = localStorage.getItem("bokirToken");
      if (userToken) {
        setToken(userToken);
      }
    }
  }, []);


  return (
    <section>
      <div className="flex items-center justify-between p-5">
        <ArrowLeft
          onClick={() => {
            router.back();
          }}
          className="w-5 h-5 cursor-pointer"
        />
        <h1 className="font-bold">
          {places.find((item) => item.id == id)?.name}
        </h1>
        <div className="w-5"></div>
      </div>

      <div className="w-full flex min-h-screen items-center justify-center overflow-auto">
        <div
          className="relative"
          style={{
            width: `${containerWidthVW}vw`,
            height: `${containerHeightVW}vw`,
          }}
        >
          {spots.map((spot, index) => (
            <div
              key={index}
              className={`${spot.available ? 'bg-white text-black' : 'bg-red-500 text-white'} absolute text-[2vw]
          flex items-center justify-center border border-black rounded shadow`}
              style={{
                width: `${boxSizeVW}vw`,
                height: `${boxSizeVW}vw`,
                top: `${spot.row * boxSizeVW}vw`,
                left: `${spot.col * boxSizeVW}vw`,
              }}
            >
              {spot.code}
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
