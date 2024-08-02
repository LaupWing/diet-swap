import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Camera, ImageUp } from "lucide-react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"

export const MealModal = () => {
    return (
        <DialogContent className="max-w-[90%] rounded">
            <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
            </DialogHeader>
            <div className="flex items-center flex-col">
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
                <Input className="hidden" id="picture" type="file" />
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
