import React from "react";
import Image from "next/image";
import { categories } from "../constants/categories";

interface CategoryProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

function Categories({ activeCategory, setActiveCategory }: CategoryProps) {
  return (
    <div className="w-full border-b overflow-x-scroll overflow-hidden bg-[#F5E6DA]">
      <div className="flex justify-start space-x-8 px-6 py-3 items-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name.toUpperCase();
          return (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveCategory(cat.name.toUpperCase())}
            >
              <Image
                src={cat.src}
                alt={cat.name}
                width={30}
                height={30}
                className={`mb-1 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              />
              <span
                className={`text-sm font-semibold tracking-wide pb-1 border-b-2 transition-all duration-200 ease-in-out ${
                  isActive
                    ? "text-black border-black"
                    : "text-gray-600 border-transparent hover:text-black hover:border-gray-400"
                }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
