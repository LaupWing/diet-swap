import { Meal, Picture } from "@/types"
import { FC } from "react"
import { Card } from "./ui/card"
import { Info } from "lucide-react"
import { IsHealthy } from "./IsHealthy"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <button>
                                    <Info />
                                </button>
                            </DialogTrigger>
                            <MealInfo meal={picture.meal} />
                        </Dialog>
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

const MealInfo: FC<{
    meal: Meal
}> = ({ meal }) => {
    return (
        <DialogContent className="max-w-md w-[90%] rounded">
            <DialogHeader className="text-left">
                <DialogTitle>{meal.name}</DialogTitle>
                <DialogDescription>{meal.description}</DialogDescription>
            </DialogHeader>

            <div className="flex items-start px-2 gap-3 flex-col">
                <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                    {meal.calories} calories
                </span>
                <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                    {meal.protein} protein
                </span>
                <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                    {meal.carbs} carb
                </span>
                <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                    {meal.fiber} fiber
                </span>
                <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                    {meal.fats} fats
                </span>
                <div className="flex flex-col text-sm gap-2 px-4 py-2 bg-slate-100 rounded">
                    <div className="flex items-center gap-1">
                        <span className="uppercase text-slate-500">
                            Healthy:
                        </span>{" "}
                        <IsHealthy healthy={meal.is_healthy!} />
                    </div>
                    <p>
                        <span className="uppercase text-slate-500">
                            Reason:
                        </span>{" "}
                        {meal.is_healthy_reason}
                    </p>
                </div>
                <div className="flex mt-4 justify-between w-full">
                    <Button>Swap</Button>
                    <Button variant={"outline"}>Close</Button>
                </div>
            </div>
        </DialogContent>
    )
}
