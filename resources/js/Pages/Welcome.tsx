import { cn, generateDateArray } from "@/lib/utils"
import { Head } from "@inertiajs/react"
import { useEffect, useRef } from "react"
export default function Welcome() {
    const date = new Date()
    return (
        <>
            <Head title="Welcome" />
            <div className="w-screen h-screen bg-background">
                <header>
                    <div className="py-2">
                        <h2 className="text-2xl font-bold">
                            {date.toLocaleString("en-US", {
                                month: "long",
                            })}
                        </h2>
                        <Dates />
                    </div>
                </header>
            </div>
        </>
    )
}

const Dates = () => {
    const today = new Date()
    const start_date = new Date()
    start_date.setDate(today.getDate() - 14)
    const end_date = new Date()
    end_date.setDate(today.getDate() + 14)
    const date_array = generateDateArray(start_date, end_date)
    const date_container = useRef<HTMLUListElement>(null)

    const DateItem = ({ date }: { date: Date }) => {
        const date_item = useRef<HTMLLIElement>(null)
        useEffect(() => {
            if (date.toLocaleDateString() === today.toLocaleDateString()) {
                date_container.current?.scrollTo({
                    left: date_item.current!.offsetLeft,
                })
            }
        }, [])
        return (
            <li
                ref={date_item}
                className={cn(
                    "w-[14.3%] snap-start opacity-20 flex flex-col py-2 rounded-xl flex-shrink-0 text-center",
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
            </li>
        )
    }

    return (
        <ul
            ref={date_container}
            className="flex mt-4 border-b snap-x gap-2 pb-2 w-full overflow-x-auto"
        >
            {date_array.map((date) => (
                <DateItem key={date.toISOString()} date={date} />
            ))}
        </ul>
    )
}
