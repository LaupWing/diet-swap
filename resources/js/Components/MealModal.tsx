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

export const MealModal = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const form = useForm({
        name: "",
        description: "",
        file: null,
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
                form.setData("file", file)
                setPreview(URL.createObjectURL(file))
            })
        } else {
            form.setData("file", e.target.files[0])
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
            <div className="flex items-center flex-col">
                {!preview ? (
                    <div className="flex items-center w-full flex-col">
                        <Button
                            className="uppercase w-full h-12 text-slate-400"
                            variant={"outline"}
                        >
                            <Label
                                htmlFor="picture-capture"
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <Camera />
                                Make Photo
                            </Label>
                        </Button>
                        <span className="text-slate-200 my-2">OR</span>
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
                            id="picture-capture"
                            type="file"
                            accept="image/*"
                            capture="environment"
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
                        console.log(form.data)
                    }}
                    className="ml-auto mt-4"
                >
                    Next
                </Button>
            </div>
        </DialogContent>
    )
}
