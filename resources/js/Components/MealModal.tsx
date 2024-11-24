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

export const MealModal = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const form = useForm({
        name: "",
        description: "",
        picture: null,
    })
    console.log(form.errors)

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
            {/* <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90">
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
            </div> */}
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
                            src={preview}
                        />
                    </div>
                )}

                <div className="grid gap-2 w-full mt-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        name="name"
                        placeholder="Name of the meal"
                        className="w-full"
                        onChange={(e) => form.setData("name", e.target.value)}
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
                    onClick={() => {
                        console.log(form.data.picture)
                        form.post(route("meals.analyze"))
                    }}
                    className="ml-auto mt-4"
                >
                    Next
                </Button>
            </div>
        </DialogContent>
    )
}
