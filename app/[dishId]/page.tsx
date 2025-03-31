"use client";
import React, { useEffect, useState } from "react";
import MenuData from "@/menu.json";
import { DishTypes } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

function Dish() {
  const params = useParams(); // Unwrap params properly
  const dishId = params?.dishId as string; // Ensure it's a string
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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-600"
              >
                Menu
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {dishData.category}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Dish Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image */}
          <div className="relative h-96 w-full">
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

          {/* Dish Info */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-xl font-bold">
                {dishData.price} ₾
              </div>
            </div>

            {/* Category */}
            <div className="mt-4">
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    <li key={index} className="flex items-center">
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
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Dishes Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            შენ ასევე შეიძლება მოგწონდეს
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MenuData.filter(
              (dish) =>
                dish.category === dishData.category && dish.id !== dishData.id
            ).map((relatedDish) => (
              <div
                onClick={() => router.push(`${relatedDish.id}`)}
                key={relatedDish.id}
                className="bg-white rounded-lg  cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className=" relative h-96">
                  {relatedDish.image ? (
                    <Image
                      src={relatedDish.image}
                      alt={relatedDish.name}
                      fill
                      priority
                      className="object-cover "
                    />
                  ) : (
                    <div className="bg-gray-200 h-full flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">
                    {relatedDish.name}
                  </h3>
                  <p className="mt-1 text-amber-600 font-bold">
                    {relatedDish.price} ₾
                  </p>
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
