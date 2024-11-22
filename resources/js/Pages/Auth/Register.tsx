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
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export default function Register() {
    const [currentStep, setCurrentStep] = useState(3)

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step2 />
            case 3:
                return <Step3 />
            default:
                return <Step2 />
        }
    }

    return (
        <div className="text-black">
            <div className="max-w-sm mx-auto mt-[10vh] px-8 pb-6">
                <div className="w-full max-w-xs flex-col justify-center">
                    <span className="text-sm text-foreground/40">
                        {currentStep} / 6
                    </span>
                </div>
                {renderStep()}
            </div>
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
                    <Label htmlFor="dateOfBirth">Gender</Label>
                    <Select defaultValue="inch">
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
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
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Weight</Label>
                    <div className="flex gap-1">
                        <Input
                            id="dateOfBirth"
                            type="number"
                            autoCorrect="off"
                        />
                        <Select defaultValue="lbs">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="weight" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kg">KG</SelectItem>
                                <SelectItem value="lbs">LBS</SelectItem>
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

const Step3 = () => {
    return (
        <form className="flex flex-col">
            <div className=" my-8 flex flex-col">
                <h2 className="text-xl font-bold">Your Goal</h2>
                <p className="text-sm">
                    Your goal is used to personalize your experience for the
                    fitness app. Keep in mind you can lose 1-2 lbs (0.5 - 1kg)
                    per week.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Ideal Weight</Label>
                    <div className="flex gap-1">
                        <Input
                            id="dateOfBirth"
                            type="number"
                            autoCorrect="off"
                        />
                        <Select defaultValue="lbs">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="weight" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kg">KG</SelectItem>
                                <SelectItem value="lbs">LBS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Months to hit the goal</Label>
                    <Select defaultValue="inch">
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            {new Array(12).fill(0).map((_, i) => (
                                <SelectItem value={(i + 1).toString()}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <Button variant={"outline"}>
                    <span>Prev</span>
                    <ChevronLeft className="size-6" />
                </Button>
                <Button className="">
                    <span>Next</span>
                    <ChevronRight className="size-6" />
                </Button>
            </div>
        </form>
    )
}
