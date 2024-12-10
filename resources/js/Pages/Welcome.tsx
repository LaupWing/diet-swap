import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { MealModal } from "@/Components/MealModal"
import { cn, generateDateArray } from "@/lib/utils"
import { Head } from "@inertiajs/react"
import { ChevronUpIcon } from "@radix-ui/react-icons"
import { CircleAlert, Command, PanelsTopLeft, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Credit, PageProps, UserGoal } from "@/types"
import { useMealsStore } from "@/stores/mealsStore"
import { MealCard } from "@/Components/MealCard"
import { Badge } from "@/Components/ui/badge"
import { useCreditsStore } from "@/stores/creditsStore"
import { Slider } from "@/Components/ui/slider"

export default function Welcome(
    props: PageProps<{
        userGoal: UserGoal
        credits: Credit
    }>
) {
    const date = new Date()
    const [open, setOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const mealsStore = useMealsStore()
    const creditsStore = useCreditsStore()

    const protein = mealsStore.pictures.reduce(
        (acc, picture) => acc + +picture.meal.protein,
        0
    )
    const calories = mealsStore.pictures.reduce(
        (acc, picture) => acc + +picture.meal.calories,
        0
    )

    useEffect(() => {
        creditsStore.setAmount(props.credits.amount)
    }, [])

    return (
        <div className="flex min-w-0 min-h-screen">
            <div
                className={cn(
                    "fixed overflow-hidden left-0 z-[100] h-screen duration-200 bg-background sm:flex-shrink-0",
                    open ? "w-52 p-4 border-r " : "w-0 p-0"
                )}
            >
                <a className="flex items-center gap-2" href="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Acme Inc</span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                </a>
            </div>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bg-black/50 sm:hidden fixed inset-0 z-[80] animate-fade"
                ></div>
            )}
            <div
                className={cn(
                    "border-r hidden duration-200 bg-background sm:block flex-shrink-0",
                    open ? "w-52 p-4 " : "w-0 p-0"
                )}
            >
                <a className="flex items-center gap-2" href="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Acme Inc</span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                </a>
            </div>
            <Head title="Welcome" />
            <div className="flex-1 w-full bg-background h-screen flex flex-col">
                <header className="z-50 bg-background border-b">
                    <div className="">
                        <div className="px-2 pr-3 pt-3 pb-2 flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1">
                                <Button
                                    onClick={() => setOpen(!open)}
                                    variant={"ghost"}
                                    size={"icon"}
                                >
                                    <PanelsTopLeft />
                                </Button>
                                <h2 className="uppercase  font-bold">
                                    {date.toLocaleString("en-US", {
                                        month: "long",
                                    })}
                                </h2>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Badge>{creditsStore.amount} credits</Badge>
                                </DialogTrigger>
                                <DialogContent className="max-w-md w-[95%] rounded">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Buying Credits
                                        </DialogTitle>
                                        <DialogDescription className="text-left text-xs">
                                            No I'm not making any money from
                                            this app. I'm just using it to learn
                                            how to build a SaaS app. You can buy
                                            credits to use the app. 1 credit = 1
                                            meal. You can buy 10 credits for
                                            $10.00.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div>
                                        <Slider
                                            defaultValue={[10]} // Starting value
                                            min={10} // Minimum value
                                            max={100} // Maximum value
                                            step={40} // Step between values: 10 → 50 → 100
                                            onValueChange={(value) =>
                                                console.log(value)
                                            } // Log selected value
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Dates />
                    </div>
                </header>

                <ScrollArea className="flex flex-col w-full bg-secondary/70 flex-1 min-h-0 items-center">
                    <div className="flex flex-col relative items-center mt-8">
                        <div className="flex gap-2 sticky top-8 w-full px-4 pt-2 pb-4 text-xs font-bold z-50">
                            <div
                                className={cn(
                                    "px-2 py-1 relative rounded-lg border-2",
                                    +calories > +props.userGoal.calories
                                        ? "border-red-400 bg-red-300"
                                        : "border-transparent bg-green-300"
                                )}
                            >
                                {+calories > +props.userGoal.calories && (
                                    <CircleAlert className="absolute text-red-400 -top-6 -right-3" />
                                )}
                                {calories} /{props.userGoal.calories} calories
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-orange-300 border-transparent border-2">
                                {protein} / {props.userGoal.protein} protein
                            </div>
                        </div>
                        <div className="flex w-full flex-col justify-center items-center">
                            {mealsStore.pictures.map((picture) => (
                                <>
                                    <MealCard
                                        key={picture.id}
                                        picture={picture}
                                    />
                                    <div className="flex flex-col items-center">
                                        <div className="w-[2px] h-20 bg-slate-200"></div>
                                    </div>
                                </>
                            ))}
                            <div className="flex flex-col items-center">
                                {mealsStore.pictures.length > 0 && (
                                    <div className="w-[2px] h-14 bg-slate-200"></div>
                                )}
                                <Dialog onOpenChange={setShowModal}>
                                    <DialogTrigger asChild>
                                        <button className="w-10 h-10 flex items-center justify-center rounded-full border-slate-200 border shadow bg-background">
                                            <Plus className="text-slate-400" />
                                        </button>
                                    </DialogTrigger>
                                    {showModal && <MealModal />}
                                </Dialog>
                            </div>
                            <div className="h-8"></div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

const Dates = () => {
    const today = new Date()
    const start_date = new Date()
    start_date.setDate(today.getDate() - 14)
    const end_date = new Date()
    end_date.setDate(today.getDate())
    const date_array = generateDateArray(start_date, end_date)
    const date_container = useRef<HTMLUListElement>(null)
    const [beginPoint, setBeginPoint] = useState(0)
    const [_, setScroll] = useState(0)
    const [endPoint, setEndPoint] = useState(0)
    const activeDateRef = useRef<null | Date>(null)
    const mealsStore = useMealsStore()

    useEffect(() => {
        if (date_container.current) {
            date_container.current.scrollTo(
                date_container.current.scrollWidth,
                0
            )
        }
    }, [])

    useEffect(() => {
        if (activeDateRef.current) {
            mealsStore.fetchPictures(activeDateRef.current)
        }
    }, [activeDateRef.current])

    const DateItem = ({ date, index }: { date: Date; index: number }) => {
        const date_item = useRef<HTMLLIElement>(null)
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        const [active, setActive] = useState(false)

        useEffect(() => {
            const midpoint =
                date_item.current!.getBoundingClientRect().left +
                date_item.current!.getBoundingClientRect().width / 2

            if (midpoint > beginPoint && midpoint < endPoint) {
                setActive(true)

                if (
                    activeDateRef.current?.toDateString() !==
                    date.toDateString()
                ) {
                    activeDateRef.current = date
                }
            } else {
                setActive(false)
            }
            if (index === 0 && !beginPoint && !endPoint) {
                setBeginPoint(date_item.current?.offsetLeft || 0)
                setEndPoint(
                    date_item.current!.offsetLeft +
                        date_item.current!.offsetWidth
                )
            }
        }, [])

        window.addEventListener("resize", () => {
            if (index !== 0) return
            setBeginPoint(date_item.current?.offsetLeft || 0)
            setEndPoint(
                date_item.current!.offsetLeft + date_item.current!.offsetWidth
            )
        })
        return (
            <li
                ref={date_item}
                className={cn(
                    "w-[20%] snap-start opacity-10 flex flex-col pt-2 flex-shrink-0 text-center",
                    active && "opacity-100"
                )}
            >
                <b className="text-lg">{date.getDate()}</b>
                <span className="text-xs">
                    {date.toLocaleString("en-US", {
                        weekday: "short",
                    })}
                </span>
                {active ? (
                    <div className="h-1 rounded-full bg-foreground mt-3"></div>
                ) : (
                    <div className="h-1 rounded-full bg-transparent mt-3"></div>
                )}
            </li>
        )
    }

    return (
        <div className="relative">
            <ul
                ref={date_container}
                className="flex border-b border-slate-100 snap-x gap-2 w-full overflow-x-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-slate-200"
                onScroll={(e) => {
                    setScroll(e.currentTarget.scrollLeft)
                }}
            >
                <li className="w-[20%] snap-start flex-shrink-0"></li>
                {date_array.map((date, index) => (
                    <DateItem
                        index={index}
                        key={date.toISOString()}
                        date={date}
                    />
                ))}
                <li className="w-[60%] flex-shrink-0 -ml-4"></li>
            </ul>
            <button className="w-[20%] ml-[20%] pl-4 flex items-center justify-center pt-1 absolute left-0">
                <ChevronUpIcon className="w-6 h-6" />
            </button>
        </div>
    )
}
