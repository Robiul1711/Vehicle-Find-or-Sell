import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const CompareTable = ({ data }) => {
  const section = data?.sections?.find(
    (s) => s.section_id === "comparison-table"
  );
  const headers = section?.table_headers || [
    "Option",
    "Ownership",
    "Monthly Payments",
    "Flexibility",
    "Best For...",
  ];
  const rows = section?.table_rows || [];

  return (
    <div className="lg:space-y-10">
      <div className="mx-auto space-y-5">
        <p className="lg:text-3xl font-bold">
          {section?.title || "Compare Purchase Options"}
        </p>
        <p className="lg:text-xl">
          {section?.description ||
            "See ownership, flexibility, and best use at a glance."}
        </p>
      </div>

      <div className="overflow-x-auto  ">
        {/* shadcn Table - add Tailwind classes for zebra striping */}
        <Table className="min-w-full divide-y">
          <TableHeader>
            <TableRow className="bg-[#E6EAEE] px-4">
              {headers.map((header, i) => (
                <TableHead
                  key={i}
                  className={i === headers.length - 1 ? "text-center" : ""}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, idx) => (
              // Apply zebra striping with Tailwind's odd/even using index
              // also add subtle hover state for rows
              <TableRow
                key={idx}
                className={`!h-12 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100/60 transition-colors`}
              >
                {row.map((cell, i) => (
                  <TableCell key={i} className={i === 0 ? "font-medium" : ""}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompareTable;
