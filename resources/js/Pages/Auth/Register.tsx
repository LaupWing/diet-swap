import { FormEventHandler, useState } from "react"
import GuestLayout from "@/Layouts/GuestLayout"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { Head, Link, useForm } from "@inertiajs/react"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { ChevronRight } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export default function Register() {
    const [currentStep, setCurrentStep] = useState(2)

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step2 />
            default:
                return <Step2 />
        }
    }

    return (
        <div className="text-black">
            <div>{renderStep()}</div>
        </div>
    )
}

const Step2 = () => {
    return (
        <form className="flex flex-col">
            <div className=" my-8 flex flex-col">
                <h2 className="text-xl font-bold">User Info</h2>
                <p className="text-sm">
                    User info is used to personalize your experience for the
                    fitness app.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-1 ">
                    <Label htmlFor="firstname">Firstname</Label>
                    <Input id="firstname" type="text" autoCorrect="off" />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input id="lastname" type="text" autoCorrect="off" />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" autoCorrect="off" />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Height</Label>
                    <div className="flex gap-1">
                        <Input
                            id="dateOfBirth"
                            type="number"
                            autoCorrect="off"
                        />
                        <Select defaultValue="inch">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Height" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cm">CM</SelectItem>
                                <SelectItem value="inch">INCH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <Button className="ml-auto mt-4">
                <span>Next</span>
                <ChevronRight className="size-6" />
            </Button>
        </form>
    )
}
