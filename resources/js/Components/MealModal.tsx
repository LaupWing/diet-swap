import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Camera, ImageUp } from "lucide-react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { useState } from "react"

export const MealModal = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const handleChange = (e: any) => {
        setPreview(URL.createObjectURL(e.target!.files[0]))
    }

    return (
        <DialogContent className="max-w-[90%] rounded">
            <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
            </DialogHeader>
            <div className="flex items-center flex-col">
                {!preview ? (
                    <div className="flex items-center w-full flex-col">
                        <Button
                            className="uppercase w-full gap-2 h-12 flex items-center justify-center text-slate-400"
                            variant={"outline"}
                        >
                            <Camera />
                            Make Photo
                        </Button>
                        <span className="text-slate-200 my-2">OR</span>
                        <Button
                            className="uppercase w-full  h-12 flex items-center justify-center text-slate-400"
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
                    </div>
                ) : (
                    <img src={preview} />
                )}
                <Input
                    onChange={handleChange}
                    className="hidden"
                    id="picture"
                    type="file"
                />
                <div className="grid gap-2 w-full mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        name="description"
                        placeholder="Give a short description"
                        className="w-full"
                    />
                </div>
                <Button className="ml-auto mt-4">Next</Button>
            </div>
        </DialogContent>
    )
}
