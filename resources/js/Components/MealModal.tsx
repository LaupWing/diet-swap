import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Camera, ImageUp, X } from "lucide-react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { useState } from "react"
import heic2any from "heic2any"
import { useForm } from "@inertiajs/react"
import { MutatingDots } from "react-loader-spinner"
import axios from "axios"
import { Meal, Picture } from "@/types"
import { IsHealthy } from "./IsHealthy"
import { useMealsStore } from "@/stores/mealsStore"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { ScrollArea } from "./ui/scroll-area"

export const MealModal = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const [response, setResponse] = useState<Meal | null>(null)
    const [loading, setLoading] = useState(false)
    const mealsStore = useMealsStore()
    const form = useForm({
        name: "",
        description: "",
        type: "",
        picture: null,
    })

    const handleChange = (e: any) => {
        if (
            e.target.files[0].type.includes("heic") ||
            e.target.files[0].type.includes("heif")
        ) {
            heic2any({
                blob: e.target.files[0],
                toType: "image/jpeg",
                quality: 1,
            }).then((file: any) => {
                form.setData("picture", file)
                setPreview(URL.createObjectURL(file))
            })
        } else {
            form.setData("picture", e.target.files[0])
            setPreview(URL.createObjectURL(e.target!.files[0]))
        }
    }

    return (
        <DialogContent className="max-w-md w-[90%] flex flex-col min-h-0 max-h-[90vh] rounded">
            <DialogHeader className="text-left">
                <DialogTitle>Add Meal</DialogTitle>
                <DialogDescription>
                    Make sure that the photo only contains the meal
                </DialogDescription>
            </DialogHeader>
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90">
                    <MutatingDots
                        visible={true}
                        height="100"
                        width="100"
                        color="#818cf8"
                        secondaryColor="#a78bfa"
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="fill-current text-slate-400"
                    />
                </div>
            )}
            <ScrollArea className="overflow-y-auto flex flex-col">
                {response ? (
                    <div className="flex items-start px-4 gap-3 flex-col">
                        <h2 className="text-xl font-bold">{response.name}</h2>
                        <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {response.calories} calories
                        </span>
                        <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {response.protein} protein
                        </span>
                        <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {response.carbs} carb
                        </span>
                        <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {response.fiber} fiber
                        </span>
                        <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                            {response.fats} fats
                        </span>
                        <div className="flex flex-col text-sm gap-2 px-4 py-2 bg-slate-100 rounded">
                            <div className="flex items-center gap-1">
                                <span className="uppercase text-slate-500">
                                    Healthy:
                                </span>{" "}
                                <IsHealthy healthy={response.is_healthy!} />
                            </div>
                            <p>
                                <span className="uppercase text-slate-500">
                                    Reason:
                                </span>{" "}
                                {response.is_healthy_reason}
                            </p>
                        </div>
                        <div className="flex mt-4 justify-between w-full">
                            <Button>Swap</Button>
                            <Button variant={"outline"}>Close</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex px-2 items-center flex-col">
                        {!preview ? (
                            <div className="flex items-center w-full flex-col">
                                <Button
                                    className="uppercase w-full h-12 flex items-center justify-center text-slate-400"
                                    variant={"outline"}
                                >
                                    <Label
                                        htmlFor="picture"
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <ImageUp />
                                        Upload Photo
                                    </Label>
                                </Button>
                                <Input
                                    onChange={handleChange}
                                    className="hidden"
                                    id="picture"
                                    type="file"
                                />
                                <Input
                                    onChange={handleChange}
                                    className="hidden"
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <Button
                                    size={"icon"}
                                    className="absolute top-2 right-2"
                                    onClick={() => setPreview(null)}
                                >
                                    <X />
                                </Button>
                                <img
                                    className="aspect-video object-cover rounded"
                                    src={preview!}
                                />
                            </div>
                        )}
                        <div className="grid gap-1 w-full mt-4">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                onValueChange={(e) => {
                                    form.setData("type", e)
                                }}
                                value={form.data.type || ""}
                            >
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="breakfast">
                                        Breakfast
                                    </SelectItem>
                                    <SelectItem value="lunch">Lunch</SelectItem>
                                    <SelectItem value="diner">Diner</SelectItem>
                                    <SelectItem value="snacks">
                                        Snacks
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-1 w-full mt-4">
                            <Label htmlFor="name">Name</Label>
                            <p className="text-xs text-slate-400">
                                Name of the meal with quantity: e.g. 1 x
                                Croissant
                            </p>
                            <Input
                                name="name"
                                placeholder="Name of the meal with quantity: e.g. 1 Croissant"
                                className="w-full"
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-2 w-full mt-4">
                            <Label htmlFor="description">Description</Label>
                            <p className="text-xs text-slate-400">
                                Description of the meal. The description should
                                match the name and photo of the meal: e.g. I ate
                                1 Croissant
                            </p>
                            <Textarea
                                name="description"
                                placeholder="Give a short description"
                                className="w-full resize-none h-36"
                                onChange={(e) =>
                                    form.setData("description", e.target.value)
                                }
                            />
                        </div>
                        <Button
                            disabled={
                                form.data.picture === null ||
                                form.data.name === "" ||
                                form.data.description === ""
                            }
                            onClick={async () => {
                                setLoading(true)
                                let formData = new FormData()
                                formData.append("picture", form.data.picture!)
                                formData.append("name", form.data.name)
                                formData.append(
                                    "description",
                                    form.data.description
                                )

                                const res = await axios.post<{
                                    meal: Meal
                                }>(route("meals.analyze"), formData, {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                })
                                setResponse(res.data.meal)

                                const mealPictures = await axios.get<Picture[]>(
                                    route("meals.get")
                                )
                                console.log(mealPictures)
                                mealsStore.setPictures(mealPictures.data)

                                setLoading(false)
                            }}
                            className="ml-auto mt-4"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </ScrollArea>
        </DialogContent>
    )
}
