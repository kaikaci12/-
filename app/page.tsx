"use client";
import MenuData from "@/menu.json";
import { useEffect, useState } from "react";
import { DishTypes } from "@/types";
import Loading from "./loading";
export default function Home() {
  const [foodData, setFoodData] = useState<DishTypes[]>();
  const [loading, setLoading] = useState(true);

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
    <div className="">
      {foodData?.map((item: DishTypes) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <div>{item.category}</div>
            <div>{item.price}</div>
            <div>
              {item.ingredients?.map((ing: string, index) => {
                return <p key={index}>{ing}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
