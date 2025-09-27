import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CustomAddress, CustomCar3, CustomCustomDollar, CustomDocument, CustomImported, CustomInsurance3, CustomLicense, CustomPassport, CustomSearch } from '@/utils/IconProvider';

const RequireDoc = [
    {
        id: 1,
        icon: <CustomPassport />,
        title: "Valid ID or Passport"
    },
    {
        id: 2,
        icon: <CustomAddress />,
        title: "Proof of Address"
    },
    {
        id: 3,
        icon: <CustomCar3 />,
        title: "Registration Certificate"
    },
    {
        id: 4,
        icon: <CustomInsurance3 />,
        title: "Insurance Document"
    },
    {
        id: 5,
        icon: <CustomLicense />,
        title: "Driving License"
    }
]

const ImportedDoc = [
    {
        id: 1,
        icon: <CustomImported />,
        title: "Quitus Fiscal"
    },
    {
        id: 2,
        icon: <CustomCustomDollar />,
        title: "Customs Form 846A"
    },
    {
        id: 3,
        icon: <CustomInsurance3 />,
        title: "Certificate of conformity"
    },

]

const VehicleRegistrationFAQ = () => {
    return (
        <div className=''>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={'x'}>
                        <div className="flex items-center gap-1">
                            <div className="w-12 h-12 bg-[#ebf1ff] text-white  rounded flex items-center justify-center mr-4">
                                <CustomDocument />
                            </div>
                            <div className="">
                                <p className="lg:text-lg">Required Documents (France)</p>
                                <p className="text-xs">Essential documents for vehicle registration</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                RequireDoc.map(item => (
                                    <div key={item.id} className="bg-gray-100 rounded p-2 text-custom-primary flex items-center gap-1">
                                        <div className="w-12 h-12  text-white  rounded flex items-center justify-center mr-4">
                                            {item.icon}
                                        </div>
                                        <p className="lg:text-lg font-medium">
                                            {item.title}
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className={'x'}>
                        <div className="flex items-center gap-1">
                            <div className="w-12 h-12 bg-[#ebf1ff] text-white  rounded flex items-center justify-center mr-4">
                                <CustomImported />
                            </div>
                            <div className="">
                                <p className="lg:text-lg">Imported Vehicles (Extra Documents)</p>
                                <p className="text-xs">Additional requirements for imported cars</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                ImportedDoc.map(item => (
                                    <div key={item.id} className="bg-gray-100 rounded p-2 text-custom-primary flex items-center gap-1">
                                        <div className="w-12 h-12  text-white  rounded flex items-center justify-center mr-4">
                                            {item.icon}
                                        </div>
                                        <p className="lg:text-lg font-medium">
                                            {item.title}
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className={'x'}>
                        <div className="flex items-center gap-1">
                            <div className="w-12 h-12 bg-[#ebf1ff] text-white  rounded flex items-center justify-center mr-4">
                                <CustomSearch />
                            </div>
                            <div className="">
                                <p className="lg:text-lg">Non-Pledge Certificate</p>
                                <p className="text-xs">Free verification through Histovec</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-[#ebf1ff] rounded p-4 text-custom-primary flex items-center gap-1">

                            <p className="lg:text-base ">
                                Confirms no unpaid fines or restrictions on the vehicle. Available for free at Histovec - the official government platform for vehicle history verification.
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default VehicleRegistrationFAQ;