import { Dialog, DialogTrigger } from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { MealModal } from "@/Components/MealModal"
import { cn, generateDateArray } from "@/lib/utils"
import { Head } from "@inertiajs/react"
import { ChevronUpIcon } from "@radix-ui/react-icons"
import { Command, PanelsTopLeft, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/Components/ui/button"
import { PageProps, Picture, UserGoal } from "@/types"
import { useMealsStore } from "@/stores/mealsStore"
import { MealCard } from "@/Components/MealCard"

export default function Welcome(
    props: PageProps<{
        userGoal: UserGoal
        pictures: Picture[]
    }>
) {
    const date = new Date()
    const [open, setOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const mealsStore = useMealsStore()

    useEffect(() => {
        mealsStore.setPictures(props.pictures)
    }, [])

    return (
        <div className="flex min-w-0 min-h-screen">
            <div
                className={cn(
                    "border-r hidden duration-200 bg-background sm:flex-shrink-0",
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
                        <div className="pl-2 pt-3 pb-2 flex items-center gap-1">
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
                        <Dates />
                    </div>
                </header>

                <ScrollArea className="flex flex-col w-full bg-secondary/70 flex-1 min-h-0 items-center">
                    <div className="flex flex-col relative items-center mt-8">
                        <div className="flex gap-2 sticky top-8 w-full px-4 pt-2 pb-4 text-xs font-bold z-50">
                            <div className="px-2 py-1 rounded-lg bg-green-300">
                                {props.userGoal.calories} calories
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-orange-300">
                                0 / {props.userGoal.protein} protein
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
                                <div className="w-[2px] h-14 bg-slate-200"></div>
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
    const [scrollLeft, setScrollLeft] = useState(0)

    const DateItem = ({ date }: { date: Date }) => {
        const date_item = useRef<HTMLLIElement>(null)
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)

        useEffect(() => {
            // if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
            //     date_container.current?.scrollTo({
            //         left: date_item.current!.offsetLeft,
            //     })
            // }
            console.log({
                date: date.toLocaleDateString(),
                left: date_item.current?.offsetLeft,
                right:
                    date_item.current!.offsetLeft +
                    date_item.current!.offsetWidth,
            })
        }, [])
        return (
            <li
                ref={date_item}
                className={cn(
                    "w-[20%] snap-start opacity-10 flex flex-col pt-2 flex-shrink-0 text-center",
                    date.toLocaleDateString() === today.toLocaleDateString() &&
                        "opacity-100"
                )}
            >
                <b className="text-lg">{date.getDate()}</b>
                <span className="text-xs">
                    {date.toLocaleString("en-US", {
                        weekday: "short",
                    })}
                </span>
                {date.toLocaleDateString() === today.toLocaleDateString() && (
                    <div className="h-1 rounded-full bg-foreground mt-3"></div>
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
                    // @ts-ignore
                    setScrollLeft(e.target.scrollLeft)
                }}
            >
                <li className="w-[20%] snap-start flex-shrink-0"></li>
                {date_array.map((date) => (
                    <DateItem key={date.toISOString()} date={date} />
                ))}
                <li className="w-[60%] flex-shrink-0 -ml-4"></li>
            </ul>
            <button className="w-[20%] ml-[20%] pl-4 flex items-center justify-center pt-1 absolute left-0">
                <ChevronUpIcon className="w-6 h-6" />
            </button>
        </div>
    )
}
