"use client";
import { parking_plan, places } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ParkingDetailProps {
  id: number;
}

export default function ParkingDetail({ id }: ParkingDetailProps) {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<string>();
  const ws = useRef<WebSocket | null>(null);

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
          setData((prev) =>
            prev.map((slot) => {
              const found = ads.data.find(
                (update: any) => update.slot_code === slot.slot_code
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

  const GetPlace = useCallback(async () => {
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
    setData(data.data[0].slots);
  }, [token]);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = localStorage.getItem("bokirToken");
      if (userToken) {
        setToken(userToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetPlace();
    }
  }, [token, GetPlace]);


  return (
    <section className="relative w-full min-h-screen overflow-auto touch-none">
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
      {/* <TransformWrapper
                minScale={0}
                centerOnInit={false}
                limitToBounds={false}
                panning={{ disabled: false }}
                pinch={{ disabled: false }}
                doubleClick={{ disabled: true }}
            >
                <TransformComponent>

                    <h1 className='mb-5 flex items-center gap-1 text-sm'>Entrance <ArrowRight className='w-3 h-3 ' /></h1>
                    <div className="flex flex-col items-center gap-2">

                        <div className='flex flex-col items-center gap-10'>
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(0, 4).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(4, 8).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-10'>
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(8, 12).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(12, 16).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-10'>
                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(16, 20).map((slot, index) => (
                                    <div
                                        key={slot.id}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs rotate-180">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-4 gap-12">
                                {parking_plan.slice(20, 24).map((slot, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium"
                                    >
                                        {slot.isTaken && (
                                            <Image
                                                src={'/car_icon.png'}
                                                width={100}
                                                height={100}
                                                alt={`A${slot.id}`}
                                                className="pointer-events-none "
                                            />
                                        )}
                                        <h1 className="absolute bottom-0 text-xs">A{slot.id}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper> */}
      <div className="min-h-screen flex items-center justify-center gap-10">
        {data &&
          data.map((item, i) => {
            return (
              <div
                key={i}
                className="relative w-20 h-32 border-b border-x border-dashed border-gray-500 rounded-b-md bg-white flex items-center justify-center text-sm font-medium rotate-180"
              >
                {item.available && (
                  <Image
                    src={"/car_icon.png"}
                    width={100}
                    height={100}
                    alt={`A1`}
                    className="pointer-events-none "
                  />
                )}
                <h1 className="absolute bottom-0 text-xs rotate-180">
                  {item.slot_code}
                </h1>
              </div>
            );
          })}
      </div>
    </section>
  );
}
