import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import Title from '@/components/common/Title';
import { CustomCheck } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';
import { Link } from 'react-router-dom';

const VehicleMaintenanceKeypoints = () => {
    return (
        <div className='space-y-10'>
            {/* What is a Maintenance History? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container">
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        What is a Maintenance History?
                    </p>
                    <p className="lg:text-xl">
                        A complete record of servicing and repairs for your vehicle.
                    </p>
                    <p className="lg:text-xl">
                        The maintenance history gathers all evidence of servicing and repairs carried out on a car: stamped service book, invoices for maintenance, technical inspections, and major mechanical work (timing belt, brakes, tires, etc.). It is the car’s health record, essential for both buying and selling.
                    </p>
                </div>
                <div className="">
                    <img src={ImageProvider.Maintenance1} alt="" />
                </div>
            </div>

            {/* Why is Maintenance History Essential? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">
                <div className="">
                    <img src={ImageProvider.Maintenance2} alt="" />
                </div>
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Why is Maintenance History Essential?
                    </p>
                    <p className="lg:text-xl">
                        Ensures reliability, safety, and value.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> For buying: confirm regular servicing.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> For selling: increase vehicle value and reassure buyers.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Anticipating costs: know what has been done and what's pending.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Safety: reduces breakdowns and increases reliability.
                        </p>
                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">

                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        How to Obtain the History?
                    </p>
                    <p className="lg:text-xl">
                        Multiple reliable sources available.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Ask the seller: service book and invoices.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Contact brand dealers: centralized digital records.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Request past technical inspections.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Use specialized platforms: Autoviza, Carfax, CarVertical, Auto Origin.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Histovec: official French government service for administrative history and mileage.
                        </p>
                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.Maintenance3} alt="" />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container">
                <div className="">
                    <img src={ImageProvider.Maintenance4} alt="" />
                </div>
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        French or Foreign Vehicles
                    </p>
                    <p className="lg:text-xl">
                        Records matter more than origin.
                    </p>
                    <p className="lg:text-xl">
                        Regardless of the car's origin, transparency of records is crucial. With service books, invoices, inspection reports, and platforms, you can verify history reliably.
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">

                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Simplified Access to History Platforms
                    </p>
                    <p className="lg:text-xl">
                        Quick, reliable, and centralized.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Quickly check key information.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Complete your buying/selling file.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Cross-check multiple sources for reliability.
                        </p>


                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.Maintenance5} alt="" />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">

                <div className="">
                    <img src={ImageProvider.Maintenance6} alt="" />
                </div>
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        What if the Vehicle Has No History?
                    </p>
                    <p className="lg:text-xl">
                        Lack of records doesn't always mean poor maintenance.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Could be lost service books or invoices.

                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Get a professional inspection if history is missing.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Vehicles without full history may have lower resale value.
                        </p>


                    </div>

                </div>


            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">


                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Key Takeaways
                    </p>
                    <p className="lg:text-xl">
                        Ensure transparency and trust before buying or selling.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Complete maintenance history = successful purchase/sale.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Access to reliable platforms simplifies your research.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Missing records should be considered but not block the purchase.
                        </p>


                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.Maintenance7} alt="" />
                </div>


            </div>

            <div className="">
                <Title level="title32" className="">Check Your Vehicle's History</Title>
                <p className="text-xl">Verify your car’s complete history instantly via trusted platforms.</p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <Link to="https://autoviza.fr/" target="_blank" className="bg-custom-primary text-white px-8 py-5 rounded-xl mt-4">
                        Autoviza
                    </Link>
                    <Link to="https://www.carfax.eu/" target="_blank" className="bg-custom-primary text-white px-8 py-5 rounded-xl mt-4">
                        Carfax
                    </Link>
                    <Link to="https://www.carvertical.com/" target="_blank" className="bg-custom-primary text-white px-8 py-5 rounded-xl mt-4">
                        CarVertical
                    </Link>
                    <Link to="https://autorigin.com/" target="_blank" className="bg-custom-primary text-white px-8 py-5 rounded-xl mt-4">
                        Auto Origin
                    </Link>
                    <Link to="https://histovec.interieur.gouv.fr/histovec/accueil" target="_blank" className="bg-custom-primary text-white px-8 py-5 rounded-xl mt-4">
                        Histovec
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleMaintenanceKeypoints;