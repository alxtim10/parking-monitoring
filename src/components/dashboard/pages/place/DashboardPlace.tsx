"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

type PlaceType = {
  place_id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
};

const DashboardPlace = () => {
  const [data, setData] = useState<PlaceType[]>();
  const [token, setToken] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const getPlace = async () => {
        try {
          const response = await fetch(
            `https://valet-production.up.railway.app/api/place/get`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setData(data.data);
          console.log(data);
        } catch {
          console.log("error");
        }
      };

      getPlace();
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = localStorage.getItem("bokirToken");
      if (userToken) {
        setToken(userToken);
      }
    }
  }, []);

  return (
    <section className="px-4 py-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Place</h1>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-sm shadow-sm text-xs  ">
          Add
        </button>
      </div>
      <div className="w-full mt-2">
        {data && (
          <>
            <div className="border rounded-lg p-3 w-full shadow-md    ">
              <h1 className="text-sm text-gray-500">Total Places</h1>
              <h1 className="font-bold text-lg">{data.length}</h1>
            </div>
            <div className="border rounded-lg p-3 shadow-md mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell align="center">
                          <button
                          onClick={() => {
                            router.push(`/dashboard/place/${item.place_id}`)
                          }}
                          >
                            <Settings className="w-5 h-5" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPlace;
