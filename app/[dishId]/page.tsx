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
          <div className=" mt-4 grid grid-cols-2 gap-4">
            {MenuData.filter(
              (dish) =>
                dish.category === dishData.category && dish.id !== dishData.id
            ).map((relatedDish) => (
              <div
                onClick={() => router.push(`/${relatedDish.id}`)}
                key={relatedDish.id}
                className="bg-white cursor-pointer p-3 rounded-lg shadow-md"
              >
                {/* Image */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  <Image
                    src={relatedDish.image || "/placeholder-image.jpg"}
                    alt={relatedDish.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Category Tag */}

                <h2 className="mt-1 text-sm font-semibold text-gray-800">
                  {relatedDish.name}
                </h2>
                <div className="flex justify-between mt-2">
                  <p className=" text-lg font-bold text-black">
                    {relatedDish.price}₾
                  </p>
                  <div className="  justify-end">
                    <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full">
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
