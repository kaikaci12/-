"use client";
import MenuData from "@/menu.json";
import { useEffect, useState } from "react";
import { DishTypes } from "@/types";
import Image from "next/image";
import Loading from "./loading";
import { useRouter } from "next/navigation";
export default function Home() {
  const [foodData, setFoodData] = useState<DishTypes[]>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (MenuData) {
      setFoodData(MenuData);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Menu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodData?.map((item: DishTypes) => (
            <div
              onClick={() => {
                router.push(`/${item.id}`);
              }}
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-96 bg-gray-200">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                    {item.price} ₾
                  </span>
                </div>

                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium mb-3">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
