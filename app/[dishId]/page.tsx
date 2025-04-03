"use client";
import React, { useEffect, useState } from "react";
import MenuData from "@/menu.json";
import { DishTypes } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
function Dish() {
  const params = useParams();
  const dishId = params?.dishId as string;
  const [dishData, setDishData] = useState<DishTypes | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (dishId) {
      const foundDish = MenuData.find((dish) => dish.id === parseInt(dishId));
      setDishData(foundDish || null);
    }
  }, [dishId]);

  if (!dishData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6DA]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Dish not found</h1>
          <p className="text-gray-600 mt-2">
            The requested dish could not be found in our menu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6DA] py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-gray-700 text-sm">
          <Link
            href="/"
            className="hover:text-gray-900 flex gap-2 items-center"
          >
            <IoMdArrowBack />
            მენიუ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">{dishData.category}</span>
        </nav>

        {/* Dish Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-56 sm:h-72 w-full">
            {dishData.image ? (
              <Image
                src={dishData.image}
                alt={dishData.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-gray-200 h-full flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {dishData.name}
            </h1>
            <div className="mt-3 flex justify-between items-center">
              <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-lg font-bold">
                {dishData.price} ₾
              </span>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {dishData.category}
              </span>
            </div>

            {/* Ingredients */}
            {dishData.ingredients && dishData.ingredients.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">
                  ინგრედიენტები
                </h2>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dishData.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-amber-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            შენ ასევე შეიძლება მოგწონდეს
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {MenuData.filter(
              (dish) =>
                dish.category === dishData.category && dish.id !== dishData.id
            ).map((relatedDish) => (
              <div
                key={relatedDish.id}
                onClick={() => router.push(`/${relatedDish.id}`)}
                className="bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:scale-105"
              >
                {/* Dish Image */}
                <div className="relative h-32 sm:h-40 rounded-t-xl overflow-hidden">
                  {relatedDish.image ? (
                    <Image
                      src={relatedDish.image}
                      alt={relatedDish.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        No Image Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Dish Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                    {relatedDish.name}
                  </h3>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-base font-semibold">
                      {relatedDish.price} ₾
                    </span>
                    <span className="text-xs uppercase bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      {relatedDish.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
