import { Picture } from "@/types"
import React, { FC } from "react"
import { Card } from "./ui/card"
import { Info } from "lucide-react"
import { IsHealthy } from "./IsHealthy"

export const MealCard: FC<{
    picture: Picture
}> = ({ picture }) => {
    return (
        <Card className="max-w-[300px] text-sm mx-auto w-full">
            <div className="flex flex-col p-6 gap-2">
                <header className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">
                            {new Date(picture.created_at).toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }
                            )}
                        </span>
                        <button>
                            <Info />
                        </button>
                    </div>
                    <h2 className="font-bold text-base">{picture.meal.name}</h2>
                    <div className="flex text-xs flex-wrap text-[10px] mt-2 gap-x-2 gap-y-1">
                        <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {picture.meal.calories} calories
                        </span>
                        <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {picture.meal.protein} protein
                        </span>
                        <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {picture.meal.carbs} carb
                        </span>
                        <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {picture.meal.fiber} fiber
                        </span>
                        <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {picture.meal.fats} fats
                        </span>
                    </div>
                </header>
                <div className="mt-2 relative">
                    <IsHealthy
                        className="absolute top-2 left-2"
                        healthy={picture.meal.is_healthy}
                    />
                    <img
                        className="w-full rounded h-32 object-cover"
                        src={picture.s3_url}
                        alt=""
                    />
                </div>
            </div>
        </Card>
    )
}
