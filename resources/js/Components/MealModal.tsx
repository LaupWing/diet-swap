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
import { Meal } from "@/types"

export const MealModal = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const form = useForm({
        name: "",
        description: "",
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
                console.log(file)
                form.setData("picture", file)
                setPreview(URL.createObjectURL(file))
            })
        } else {
            form.setData("picture", e.target.files[0])
            setPreview(URL.createObjectURL(e.target!.files[0]))
        }
    }

    return (
        <DialogContent className="max-w-md w-[90%] rounded">
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
            {true ? (
                <div className="flex items-start px-4 gap-3 flex-col">
                    <h2 className="text-xl font-bold">Reese's Chocolate</h2>
                    <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        913 calories
                    </span>
                    <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        98 protein
                    </span>
                    <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        98 carb
                    </span>
                    <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        98 fiber
                    </span>
                    <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                        98 fats
                    </span>
                    <div className="flex flex-col text-sm gap-2 px-4 py-2 bg-slate-100 rounded">
                        <div className="flex items-center gap-1">
                            <span className="uppercase text-slate-500">
                                Healthy:
                            </span>{" "}
                            <div className="rounded-full bg-background px-2 py-[2px] text-xs uppercase font-bold text-yellow-500">
                                It's okay 👍
                            </div>
                        </div>
                        <p>
                            <span className="uppercase text-slate-500">
                                Reason:
                            </span>{" "}
                            High in sugar
                        </p>
                    </div>
                    <Button className="ml-auto mt-4">Close</Button>
                </div>
            ) : (
                <div className="flex items-center flex-col">
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

                    <div className="grid gap-2 w-full mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            name="name"
                            placeholder="Name of the meal"
                            className="w-full"
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-2 w-full mt-4">
                        <Label htmlFor="description">Description</Label>
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

                            setLoading(false)
                        }}
                        className="ml-auto mt-4"
                    >
                        Next
                    </Button>
                </div>
            )}
        </DialogContent>
    )
}
