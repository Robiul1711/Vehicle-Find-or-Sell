import { CustomAdvantage, CustomDisadvantage } from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const VehiclePurchaseKeypoints = ({ data }) => {
  const sections = data?.sections || [];
  const cashPurchase = sections.find(
    (s) => s.section_id === "cash-purchase" || s.section_id === "achat-comptant"
  );
  const autoLoan = sections.find(
    (s) => s.section_id === "auto-loan" || s.section_id === "credit-auto"
  );
  const loa = sections.find((s) => s.section_id === "loa");
  const lld = sections.find((s) => s.section_id === "lld");

  return (
    <div className="lg:space-y-20 w-full">
      {cashPurchase && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
          <div className="space-y-4 lg:space-y-10">
            <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{__html: cashPurchase.title}}></p>
            <p className="lg:text-xl" dangerouslySetInnerHTML={{__html: cashPurchase.description}}></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomAdvantage />
                </div>

                <p className="lg:text-2xl font-medium">Advantage</p>
                <ul className="list-disc pl-4 ">
                  {(cashPurchase.advantages || []).map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomDisadvantage />
                </div>

                <p className="lg:text-2xl font-medium">Disadvantage</p>
                <ul className="list-disc pl-4 ">
                  {(cashPurchase.disadvantages || []).map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm"
              src={cashPurchase.image_url || ImageProvider.purchase1}
              alt=""
            />
          </div>
        </div>
      )}

      {autoLoan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
          <div className="">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm"
              src={autoLoan.image_url || ImageProvider.purchase2}
              alt=""
            />
          </div>
          <div className="space-y-4 lg:space-y-10">
            <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: autoLoan.title }} ></p>
            <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: autoLoan.description }}></p>
            <div className="">
              <p className="lg:text-2xl font-medium">Features</p>
              <ul className="list-disc pl-4 ">
                {(autoLoan.bullets || []).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomAdvantage />
                </div>

                <p className="lg:text-2xl font-medium">Advantage</p>
                <ul className="list-disc pl-4 ">
                  {(autoLoan.advantages || []).map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomDisadvantage />
                </div>

                <p className="lg:text-2xl font-medium">Disadvantage</p>
                <ul className="list-disc pl-4 ">
                  {(autoLoan.disadvantages || []).map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {loa && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
          <div className="space-y-4 lg:space-y-10">
            <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: loa.title }} ></p>
            <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: loa.description }}></p>
            <div className="">
              <p className="lg:text-2xl font-medium">Features</p>
              <ul className="list-disc pl-4 ">
                {(loa.bullets || []).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomAdvantage />
                </div>

                <p className="lg:text-2xl font-medium">Advantage</p>
                <ul className="list-disc pl-4 ">
                  {(loa.advantages || []).map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomDisadvantage />
                </div>

                <p className="lg:text-2xl font-medium">Disadvantage</p>
                <ul className="list-disc pl-4 ">
                  {(loa.disadvantages || []).map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm"
              src={loa.image_url || ImageProvider.purchase3}
              alt=""
            />
          </div>
        </div>
      )}

      {lld && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
          <div className="">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm"
              src={lld.image_url || ImageProvider.purchase2}
              alt=""
            />
          </div>
          <div className="space-y-4 lg:space-y-10">
            <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: lld.title }} ></p>
            <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: lld.description }}></p>
            <div className="">
              <p className="lg:text-2xl font-medium">Features</p>
              <ul className="list-disc pl-4 ">
                {(lld.bullets || []).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomAdvantage />
                </div>

                <p className="lg:text-2xl font-medium">Advantage</p>
                <ul className="list-disc pl-4 ">
                  {(lld.advantages || []).map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  <CustomDisadvantage />
                </div>

                <p className="lg:text-2xl font-medium">Disadvantage</p>
                <ul className="list-disc pl-4 ">
                  {(lld.disadvantages || []).map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePurchaseKeypoints;
