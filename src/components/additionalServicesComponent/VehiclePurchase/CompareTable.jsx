import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

const allData = [
    { id: 1, option: "Cash", owenership: "yes, Intermediate", monthlyPayment: "No", flexibility: "Low", best: 'Avoid Creadit' },
    { id: 2, option: "Auto Loan", owenership: "yes, Intermediate", monthlyPayment: "Yes", flexibility: "Medium", best: 'Those who want ownership with installments' },
    { id: 3, option: "LOA", owenership: "No (option later) ", monthlyPayment: "Yes", flexibility: "High", best: 'Those who like to change cars often' },
    { id: 4, option: "LLD", owenership: "No", monthlyPayment: "Yes", flexibility: "Very High", best: 'Those who want convenience without resale' },
];

const CompareTable = () => {
    return (
        <div className='lg:space-y-10'>
            <div className="mx-auto space-y-5">
                <p className="lg:text-3xl font-bold">
                    Compare Purchase Options
                </p>
                <p className="lg:text-xl">
                    See ownership, flexibility, and best use at a glance.
                </p>
            </div>

            <div className="overflow-x-auto  ">
                {/* shadcn Table - add Tailwind classes for zebra striping */}
                <Table className="min-w-full divide-y">
                    <TableHeader>
                        <TableRow className="bg-[#E6EAEE] px-4">
                            <TableHead className="">Option</TableHead>
                            <TableHead className="">Ownership</TableHead>
                            <TableHead className=" ">Monthly Payments</TableHead>
                            <TableHead className=" ">Felexibility</TableHead>
                            <TableHead className=" text-center">Best For...</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody>
                        {allData.map((data, idx) => (
                            // Apply zebra striping with Tailwind's odd/even using index
                            // also add subtle hover state for rows
                            <TableRow
                                key={data.id}
                                className={`!h-12 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100/60 transition-colors`}
                            >
                                <TableCell className="font-medium">{data.option}</TableCell>
                                <TableCell>{data.owenership}</TableCell>
                                <TableCell className="">{data.monthlyPayment}</TableCell>
                                <TableCell className="">{data.flexibility}</TableCell>
                                <TableCell className="">{data.best}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CompareTable;