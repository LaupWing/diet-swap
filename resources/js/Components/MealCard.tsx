import { Meal, Picture } from "@/types"
import { FC, useState } from "react"
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
import { InfinitySpin } from "react-loader-spinner"
import axios from "axios"
import { ScrollArea } from "@radix-ui/react-scroll-area"

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
    const [loading, setLoading] = useState(false)
    const [showSwapList, setShowSwapList] = useState(true)
    const [swapList, setSwapList] = useState<
        Array<{
            name: string
            description: string
            calories: number
            protein: number
            carb: number
            fiber: number
            fats: number
            calorie_difference: number
            why: string
        }>
    >([
        {
            name: "Grilled Chicken Salad",
            description:
                "A fresh salad with 150g of grilled chicken breast, mixed greens, cherry tomatoes, cucumbers, and a light vinaigrette.",
            calories: 400,
            protein: 40,
            carb: 20,
            fiber: 5,
            fats: 15,
            calorie_difference: -900,
            why: "This meal is lower in calories and fats while providing a good amount of protein and fiber, making it a healthier option for a balanced diet.",
        },
        {
            name: "Quinoa Bowl with Black Beans",
            description:
                "A wholesome bowl with 1 cup of cooked quinoa, 1/2 cup of black beans, corn, diced bell peppers, and avocado.",
            calories: 500,
            protein: 20,
            carb: 80,
            fiber: 15,
            fats: 10,
            calorie_difference: -800,
            why: "This quinoa bowl offers plant-based protein and fiber, is lower in calories, and contains healthy fats from avocado, promoting better digestion.",
        },
        {
            name: "Turkey and Avocado Wrap",
            description:
                "A wrap made with a whole grain tortilla, 100g of turkey breast, lettuce, tomato, and slices of avocado.",
            calories: 450,
            protein: 30,
            carb: 45,
            fiber: 8,
            fats: 15,
            calorie_difference: -850,
            why: "Using whole grains and lean turkey provides a healthier protein source along with beneficial fats from avocado, reducing calorie intake significantly.",
        },
        {
            name: "Vegetable Stir-Fry with Tofu",
            description:
                "A 200g portion of tofu stir-fried with a variety of vegetables like bell peppers, broccoli, and carrots, served over brown rice.",
            calories: 550,
            protein: 25,
            carb: 70,
            fiber: 6,
            fats: 12,
            calorie_difference: -750,
            why: "This is a well-balanced meal, rich in plant proteins and fiber, with lower calories and healthy fats, making it an excellent alternative.",
        },
        {
            name: "Baked Salmon with Asparagus",
            description:
                "A healthy serving of 150g baked salmon with a side of roasted asparagus and a squeeze of lemon.",
            calories: 500,
            protein: 35,
            carb: 10,
            fiber: 4,
            fats: 30,
            calorie_difference: -800,
            why: "Baked salmon is a great source of omega-3 fatty acids and protein while being lower in carbs and calories, making it a heart-healthy option.",
        },
    ])

    const swapMeal = async () => {
        setLoading(true)
        const res = await axios.get(
            route("meals.swap", {
                meal: meal.id,
            })
        )
        console.log(res.data)
        setLoading(false)
    }

    const SwapList = () => {
        const [details, setDetails] = useState<any>(null)

        return !details ? (
            <div className="flex flex-col flex-1 min-h-0">
                <ScrollArea className=" overflow-auto flex-1 flex flex-col">
                    <ul className="flex items-start min-h-0 px-2 gap-4 flex-col relative">
                        {swapList.map((meal, i) => (
                            <li
                                className="text-xs hover:border-slate-300 cursor-pointer flex gap-2 border rounded px-3 py-4 flex-col"
                                key={i}
                                onClick={() => setDetails(meal)}
                            >
                                <h2 className="flex text-sm text-slate-500 items-center gap-1">
                                    {meal.name}
                                </h2>
                                <p className="text-slate-500">
                                    {meal.description}
                                </p>
                                <div className="flex gap-1 flex-wrap">
                                    <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                        {meal.calories} calories
                                    </span>
                                    <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                        {meal.protein} protein
                                    </span>
                                    <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                        {meal.carb} carb
                                    </span>
                                    <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                        {meal.fiber} fiber
                                    </span>
                                    <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                        {meal.fats} fats
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <div className="flex mt-6 justify-between w-full">
                    <Button onClick={swapMeal}>Back</Button>
                    <Button variant={"outline"}>Close</Button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h2 className="flex font-bold items-center gap-1">
                        {details.name}
                    </h2>
                    <p className="text-slate-500 text-sm">
                        {details.description}
                    </p>
                </div>
                <div className="flex gap-1 flex-wrap text-sm">
                    <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        {details.calories} calories
                    </span>
                    <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        {details.protein} protein
                    </span>
                    <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        {details.carb} carb
                    </span>
                    <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        {details.fiber} fiber
                    </span>
                    <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        {details.fats} fats
                    </span>
                </div>
                <p className="text-slate-800 text-sm uppercase font-bold">
                    <span className="uppercase text-slate-500">
                        Calorie Difference:
                    </span>{" "}
                    {details.calorie_difference}
                </p>
                <p className="text-slate-800 text-sm">
                    <span className="uppercase font-bold text-slate-500">
                        Why:
                    </span>{" "}
                    {details.why}
                </p>
                <div className="flex mt-2 justify-between w-full">
                    <Button
                        onClick={() => setDetails(null)}
                        variant={"outline"}
                    >
                        Back
                    </Button>
                    <Button>Save</Button>
                </div>
            </div>
        )
    }

    return (
        <DialogContent className="max-w-md flex max-h-[90vh] flex-col w-[90%] min-h-0 rounded">
            <DialogHeader className="text-left">
                <DialogTitle>{meal.name}</DialogTitle>
                <DialogDescription>{meal.description}</DialogDescription>
            </DialogHeader>

            {showSwapList ? (
                <SwapList />
            ) : (
                <div className="flex items-start px-2 gap-3 flex-col relative">
                    {loading && (
                        <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                            <InfinitySpin width="200" color="#818cf8" />
                        </div>
                    )}
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
                        <Button onClick={swapMeal}>Swap</Button>
                        <Button variant={"outline"}>Close</Button>
                    </div>
                </div>
            )}
        </DialogContent>
    )
}
