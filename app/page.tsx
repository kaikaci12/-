"use client";
import MenuData from "@/menu.json";
import { useEffect, useState } from "react";
import { DishTypes } from "@/types";
import Image from "next/image";
import Categories from "./components/Categories";
import { useRouter } from "next/navigation";

export default function Home() {
  const [foodData, setFoodData] = useState<DishTypes[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ყველა");

  const router = useRouter();
  useEffect(() => {
    if (activeCategory === "ყველა") {
      setFoodData(MenuData);
    } else {
      const filteredData = MenuData.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFoodData(filteredData);
    }
  }, [activeCategory]);

  const handleSearch = (searchTerm: string) => {
    setFoodData(
      MenuData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#e8c1a0] pb-4">
      <header className="  bg-[#ebb92d] shadow-sm sticky top-0 z-10">
        <div className=" container mx-auto px-4 py-3">
          <div className=" w-full flex items-center ">
            {/* Logo */}
            <div className=" w-full flex items-center gap-15 ">
              <div className="gap-4 flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    alt="restaurant logo"
                    width={60}
                    height={60}
                    src="/globe.png"
                    className="rounded-full object-cover border-2 border-[#ccae7a]"
                  />
                </div>
                <h1 className="text-xl font-bold text-gray-800 ">მენიუ</h1>
              </div>

              <div className="">
                <div className="relative ">
                  <input
                    type="text"
                    placeholder="ძიება..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border text-black border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm bg-white shadow-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile title - shows when logo is hidden */}
        </div>
      </header>

      {/* Categories */}

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Menu Grid */}
      <main className="px-4 mt-4 grid grid-cols-2 gap-4">
        {foodData.map((item: DishTypes) => (
          <div
            onClick={() => router.push(`/${item.id}`)}
            key={item.id}
            className="bg-white cursor-pointer p-3 rounded-lg shadow-md"
          >
            {/* Image */}
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={item.image || "/placeholder-image.jpg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Category Tag */}

            <h2 className="mt-1 text-sm font-semibold text-gray-800">
              {item.name}
            </h2>
            <div className="flex justify-between mt-2">
              <p className=" text-lg font-bold text-black">{item.price}₾</p>
              <div className="  justify-end">
                <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {foodData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">პროდუქტები არ მოიძებნა</p>
        </div>
      )}
    </div>
  );
}
