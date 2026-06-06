import React from "react";
import { MessageCircle, MoveUpRight } from "lucide-react";
import { CommonPageWrapper } from "@/components/common/CommonPageWrapper";
import { Link, useSearchParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import SEO from "@/components/common/SEO";

const ProductComparison = () => {
  const [searchParams] = useSearchParams();
  const id1 = searchParams.get("id1");
  const id2 = searchParams.get("id2");

  const { data: compareData, isLoading } = useApiQuery({
    queryKey: ["compareData", id1, id2],
    url: "/ads/compare/",
    secure: false,
    params: {
      id1: id1,
      id2: id2,
    },
    enabled: !!id1 && !!id2,
  });

  const ProductCard = ({ product }) => {
    const mainImage = product.media?.image?.[0]?.file || "";

    const { mutate, isPending } = useApiMutation({
      url: "/message/conversations/get-or-create/",
      method: "POST",
      secure: true,
    });
    return (
      <div className="bg-white rounded-lg shadow-sm flex flex-col justify-between border">
        <div>
          {/* Product Image */}
          <div className="h-80 bg-gray-100 relative rounded-t-lg overflow-hidden">
            <img
              src={mainImage}
              className="object-cover w-full h-full"
              alt={product.title}
            />
          </div>

          {/* Product Title */}
          <div className="p-6 pb-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {product.title}
            </h2>
          </div>

          {/* Basic Details */}
          <div className="px-6 py-6 border-b">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Basic Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="space-y-3">
                <DetailRow label="Brand" value={product.brand_name} />
                <DetailRow label="Body Type" value={product.body} />
                <DetailRow
                  label="Mileage"
                  value={product.mileage ? `${product.mileage} km` : "N/A"}
                />
                <DetailRow label="Fuel Type" value={product.fuel_type} />
                <DetailRow label="Transmission" value={product.transmission} />
                <DetailRow label="Color" value={product.color} />
              </div>
              <div className="space-y-3">
                <DetailRow label="Model" value={product.model} />
                <DetailRow
                  label="Price"
                  value={
                    product.discount_price
                      ? `€ ${product.discount_price}`
                      : `€ ${product.original_price}`
                  }
                  isBold
                />
                <DetailRow label="Condition" value={product.condition} />
                <DetailRow label="Doors" value={product.door} />
                <DetailRow label="Engine Type" value={product.engine_type} />
                <DetailRow
                  label="Year"
                  value={
                    product.exact_date
                      ? product.exact_date.split("-")[0]
                      : "N/A"
                  }
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="px-6 py-6 border-b">
            <h3 className="text-base font-bold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {product.features_grouped &&
              Object.keys(product.features_grouped).length > 0 ? (
                Object.keys(product.features_grouped).map((category) => (
                  <FeatureList
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    items={product.features_grouped[category]}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 col-span-2">
                  No features listed
                </p>
              )}
            </div>
          </div>

          {/* Seller & Description */}
          <div className="px-6 py-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Seller Information
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {product.seller_address?.city}, {product.seller_address?.country}
            </p>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 line-clamp-4">
              {product.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 mt-auto flex flex-col sm:flex-row gap-3">
          {/* {console.log(product)} */}
          <Link
            onClick={() =>
              mutate({
                user_id: product?.user,
                ad_id: product?.id,
                ad_type: product?.vehicle_type,
              })
            }
            to="/dashboard/message"
            className="flex-1 py-3 flex items-center justify-center gap-2 bg-blue-100 text-custom-primary rounded-lg  font-medium border-2 border-custom-primary transition-colors "
          >
            <MessageCircle className="w-4 h-4" /> Message Seller
          </Link>
          {/* {console.log(product)} */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${product?.seller_details?.phone}?text=Hi, I'm interested in your ${product.title}!`,
                "_blank",
              )
            }
            className="flex-1 py-3 flex items-center justify-center gap-2 bg-green-50 text-green-600 rounded-lg font-medium border border-green-600 transition-colors hover:bg-green-100"
          >
            WhatsApp <MoveUpRight className="w-4 h-4" />
          </button>
          <Link
          to={`/details/${product.id}/${product.slug}`}
          className="flex-1 py-3 bg-gray-900 text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors">
            View Details
          </Link>
        </div>
      </div>
    );
  };

  const DetailRow = ({ label, value, isBold = false }) => (
    <div className="flex justify-between items-center gap-2">
      <span className="text-gray-500 whitespace-nowrap">{label}</span>
      <span
        className={`text-right ${isBold ? "font-bold text-gray-900" : "text-gray-900 font-medium"} capitalize`}
      >
        {value || "N/A"}
      </span>
    </div>
  );

  const FeatureList = ({ title, items }) => (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      {items && items.length > 0 ? (
        <ul className="text-xs text-gray-600 space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-400">
          No {title.toLowerCase()} features listed
        </p>
      )}
    </div>
  );

  return (
    <CommonPageWrapper>
      <SEO 
        title="Compare Vehicles"
        description="Compare vehicles side-by-side to evaluate specifications, price, fuel type, transmission, and features on Ronpoin."
      />
      <div className=" ">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Vehicle Comparison
          </h1>
          <p className="text-gray-500">
            Comparing selected vehicles side-by-side to help you choose the best
            one.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-primary"></div>
            <p className="text-gray-500 font-medium">
              Loading comparison data...
            </p>
          </div>
        ) : compareData && compareData.length > 0 ? (
          <div
            className={`grid gap-8 ${compareData.length === 1 ? "max-w-2xl mx-auto grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
          >
            {compareData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center h-96 flex items-center justify-center flex-col bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4 text-lg">
              No products selected for comparison
            </p>
            <Link
              to="/listings"
              className="text-custom-primary font-bold hover:underline"
            >
              Back to Listings
            </Link>
          </div>
        )}
      </div>
    </CommonPageWrapper>
  );
};

export default ProductComparison;
