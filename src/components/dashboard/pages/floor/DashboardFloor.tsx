import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardFloor = () => {
  return (
    <section className="px-4 py-2 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Floor</h1>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-sm shadow-sm text-xs  ">Add</button>
      </div>
      <div className="w-full mt-2">
        <div className="border rounded-lg p-3 w-full shadow-md    ">
          <h1 className="text-sm text-gray-500">Total Places</h1>
          <h1 className="font-bold text-lg">10</h1>
        </div>
        <div className="border rounded-lg p-3 shadow-md mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Grand Indonesia</TableCell>
                <TableCell>Mall</TableCell>
                <TableCell>Jl. M.H. Thamrin No.1</TableCell>
                <TableCell>Jakarta</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default DashboardFloor;
