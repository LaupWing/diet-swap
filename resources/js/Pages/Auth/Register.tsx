import { FC, useState } from "react"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { useForm } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"

interface FormData {
    email: string
    password: string
    confirm_password: string
    firstname: string
    lastname: string
    dateOfBirth: string
    weight: string
    weight_unit: string
    height: string
    height_unit: string
    ideal_weight: string
    gender: string
    ideal_weight_timespan_in_months: string
    dietary: string
    cuisine: string
    allergies: string
    special_notes: string
    activity_level: string
    timezone: string
}

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1)
    const form = useForm<FormData>({
        email: "",
        password: "",
        confirm_password: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        gender: "",
        weight: "",
        weight_unit: "lbs",
        height: "",
        height_unit: "inch",
        ideal_weight: "",
        ideal_weight_timespan_in_months: "",
        dietary: "",
        cuisine: "",
        allergies: "",
        special_notes: "",
        activity_level: "sedentary",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    const disableNext = () => {
        switch (currentStep) {
            case 1:
                return (
                    !form.data.email ||
                    !form.data.password ||
                    form.data.confirm_password !== form.data.password
                )
            case 2:
                return (
                    !form.data.firstname ||
                    !form.data.lastname ||
                    !form.data.dateOfBirth ||
                    !form.data.gender ||
                    !form.data.height ||
                    !form.data.weight ||
                    !form.data.weight_unit ||
                    !form.data.height_unit
                )
            case 3:
                return (
                    !form.data.ideal_weight ||
                    !form.data.ideal_weight_timespan_in_months
                )
            case 4:
                return false
            default:
                return false
        }
    }

    const setFormData = (data: any) => {
        form.setData({
            ...form.data,
            ...data,
        })
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1
                        formData={form.data}
                        setData={(data) => setFormData(data)}
                    />
                )
            case 2:
                return (
                    <Step2
                        formData={form.data}
                        setData={(data) => setFormData(data)}
                    />
                )
            case 3:
                return (
                    <Step3
                        formData={form.data}
                        setData={(data) => setFormData(data)}
                    />
                )
            case 4:
                return (
                    <Step4
                        formData={form.data}
                        setData={(data) => setFormData(data)}
                    />
                )
            case 5:
                return (
                    <Step5
                        formData={form.data}
                        setData={(data) => setFormData(data)}
                    />
                )
        }
    }

    const submitInfo = () => {
        form.post(route("generate"))
    }

    return (
        <div className="text-black">
            <div className="max-w-sm mx-auto mt-[10vh] px-8 pb-6">
                <div className="w-full max-w-xs flex-col justify-center">
                    <span className="text-sm text-foreground/40">
                        {currentStep} / 5
                    </span>
                </div>
                {renderStep()}
                <div className="mt-6 flex justify-between">
                    {currentStep != 1 && (
                        <Button
                            onClick={() => {
                                setCurrentStep(currentStep - 1)
                            }}
                            variant={"outline"}
                        >
                            <span>Prev</span>
                            <ChevronLeft className="size-6" />
                        </Button>
                    )}
                    {currentStep !== 5 ? (
                        <Button
                            disabled={disableNext()}
                            className={cn(currentStep === 1 && "ml-auto")}
                            onClick={() => {
                                setCurrentStep(currentStep + 1)
                            }}
                        >
                            <span>Next</span>
                            <ChevronRight className="size-6" />
                        </Button>
                    ) : (
                        <Button
                            onClick={submitInfo}
                            className="bg-green-400 hover:bg-green-500"
                        >
                            <Check className="size-6 mx-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

const Step1: FC<{
    setData: (data: any) => void
    formData: FormData
}> = ({ setData, formData }) => {
    return (
        <div className="flex flex-col">
            <div className="my-8 flex flex-col">
                <h2 className="text-xl font-bold">Login Info</h2>
                <p className="text-sm">
                    The info is used to login to the diet swap app.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="test@example.com"
                        onChange={(e) => {
                            setData({ email: e.target.value })
                        }}
                        value={formData.email}
                    />
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="email">Password</Label>
                    <Input
                        onChange={(e) => {
                            setData({ password: e.target.value })
                        }}
                        id="password"
                        type="password"
                        autoCorrect="off"
                        value={formData.password}
                    />
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="email">Confirm Password</Label>
                    <Input
                        id="confirm_password"
                        type="password"
                        autoCorrect="off"
                        onChange={(e) => {
                            setData({ confirm_password: e.target.value })
                        }}
                        value={formData.confirm_password}
                    />
                </div>
            </div>
        </div>
    )
}

const Step2: FC<{
    setData: (data: any) => void
    formData: FormData
}> = ({ setData, formData }) => {
    const [timezones, setTimezones] = useState(
        Intl.supportedValuesOf("timeZone")
    )

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
                    <Input
                        id="firstname"
                        onChange={(e) => {
                            setData({ firstname: e.target.value })
                        }}
                        type="text"
                        autoCorrect="off"
                        value={formData.firstname}
                    />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input
                        onChange={(e) => {
                            setData({ lastname: e.target.value })
                        }}
                        id="lastname"
                        type="text"
                        autoCorrect="off"
                        value={formData.lastname}
                    />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                        onChange={(e) => {
                            setData({ dateOfBirth: e.target.value })
                        }}
                        id="dateOfBirth"
                        type="date"
                        autoCorrect="off"
                        value={formData.dateOfBirth}
                    />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        onValueChange={(e) => {
                            setData({
                                gender: e,
                            })
                        }}
                        value={formData.gender || ""}
                    >
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
                <div className="grid gap-1">
                    <Label htmlFor="timezone">Timezone</Label>
                    <div className="flex items-center gap-1">
                        <Select
                            onValueChange={(e) => {
                                setData({ timezone: e })
                            }}
                            value={formData.timezone || ""}
                        >
                            <SelectTrigger className="w-auto flex-1">
                                <SelectValue placeholder="Timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                {timezones.map((timezone) => (
                                    <SelectItem key={timezone} value={timezone}>
                                        {timezone}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            type="button"
                            onClick={() => {
                                setData({
                                    timezone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                })
                            }}
                            variant={"outline"}
                            size="icon"
                        >
                            <RotateCcw size={20} />
                        </Button>
                    </div>
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="height">Height</Label>
                    <div className="flex gap-1">
                        <Input
                            id="height"
                            type="number"
                            autoCorrect="off"
                            onChange={(e) => {
                                setData({
                                    height: e.target.value,
                                })
                            }}
                            value={formData.height}
                        />
                        <Select
                            onValueChange={(e) => {
                                setData({
                                    height_unit: e,
                                })
                            }}
                            value={formData.height_unit}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cm">CM</SelectItem>
                                <SelectItem value="inch">INCH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="weight">Weight</Label>
                    <div className="flex gap-1">
                        <Input
                            onChange={(e) => {
                                setData({
                                    weight: e.target.value,
                                })
                            }}
                            id="weight"
                            type="number"
                            autoCorrect="off"
                            value={formData.weight}
                        />
                        <Select
                            onValueChange={(e) => {
                                setData({
                                    weight_unit: e,
                                })
                            }}
                            value={formData.weight_unit}
                        >
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
        </form>
    )
}

const Step3: FC<{
    setData: (data: any) => void
    formData: FormData
}> = ({ setData, formData }) => {
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
                            id="ideal_weight"
                            type="number"
                            autoCorrect="off"
                            onChange={(e) => {
                                setData({
                                    ideal_weight: e.target.value,
                                })
                            }}
                            value={formData.ideal_weight}
                        />
                        <Select
                            onValueChange={(e) => {
                                setData({
                                    weight_unit: e,
                                })
                            }}
                            value={formData.weight_unit}
                        >
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
                    <Label htmlFor="ideal_weight_timespan_in_months">
                        Months to hit the goal
                    </Label>
                    <Select
                        value={formData.ideal_weight_timespan_in_months}
                        onValueChange={(e) => {
                            setData({
                                ideal_weight_timespan_in_months: e,
                            })
                        }}
                    >
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Months" />
                        </SelectTrigger>
                        <SelectContent>
                            {new Array(12).fill(0).map((_, i) => (
                                <SelectItem key={i} value={(i + 1).toString()}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </form>
    )
}

const Step4: FC<{
    setData: (data: any) => void
    formData: FormData
}> = ({ setData, formData }) => {
    return (
        <form className="flex flex-col">
            <div className=" my-8 flex flex-col">
                <h2 className="text-xl font-bold">Meal Preferences</h2>
                <p className="text-sm">
                    Your meal preferences are used to personalize your
                    experience for the fitness app. You can skip this step and
                    fill it later.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-1 ">
                    <Label htmlFor="dietary">Dietary</Label>
                    <Select
                        onValueChange={(e) => {
                            setData({
                                dietary: e,
                            })
                        }}
                        value={formData.dietary}
                    >
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Dietary" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="vegetarian">
                                Vegetarian
                            </SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="dairy-free">
                                Dairy Free
                            </SelectItem>
                            <SelectItem value="low-carb-high-protein">
                                Low Carb, High Protein
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="cuisine">Cuisine</Label>
                    <Select
                        onValueChange={(e) => {
                            setData({
                                cuisine: e,
                            })
                        }}
                        value={formData.cuisine}
                    >
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="italian">Italian</SelectItem>
                            <SelectItem value="mexican">Mexican</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="mediterranean">
                                Mediterranean
                            </SelectItem>
                            <SelectItem value="thai">Thai</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="greek">Greek</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="allergies">
                        Allergies (seperated by comma)
                    </Label>
                    <Input
                        id="allergies"
                        type="text"
                        placeholder="Allergies (seperated by comma)"
                        autoCorrect="off"
                        value={formData.allergies}
                        onChange={(e) => {
                            setData({
                                allergies: e.target.value,
                            })
                        }}
                    />
                </div>
                <div className="grid gap-1 ">
                    <Label htmlFor="special_notes">Special Notes</Label>
                    <Textarea
                        id="special_notes"
                        placeholder="Anything else you want to mention. Maybe you don't like spicy food?"
                        className="h-36 resize-none"
                        value={formData.special_notes}
                        onChange={(e) => {
                            setData({
                                special_notes: e.target.value,
                            })
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

const Step5: FC<{
    setData: (data: any) => void
    formData: FormData
}> = ({ setData, formData }) => {
    return (
        <form className="flex flex-col">
            <div className=" my-8 flex flex-col">
                <h2 className="text-xl font-bold">Activity Level</h2>
                <p className="text-sm">
                    Your activity level is used to get a better understanding of
                    your daily calorie needs.
                </p>
            </div>
            <RadioGroup
                className="grid gap-4"
                value={formData.activity_level}
                onValueChange={(e) => {
                    setData({
                        activity_level: e,
                    })
                }}
                defaultValue="sedentary"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary">Sedentary (office job)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="light-exercise"
                        id="light-exercise"
                    />
                    <Label htmlFor="light-exercise">
                        Light Exercise (1-2 days/week)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="moderate-exercise"
                        id="moderate-exercise"
                    />
                    <Label htmlFor="moderate-exercise">
                        Moderate Exercise (3-5 days/week)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="heavy-exercise"
                        id="heavy-exercise"
                    />
                    <Label htmlFor="heavy-exercise">
                        Heavy Exercise (6-7 days/week)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="athlete" id="athlete" />
                    <Label htmlFor="athlete">Athlete (2x per day)</Label>
                </div>
            </RadioGroup>
        </form>
    )
}
