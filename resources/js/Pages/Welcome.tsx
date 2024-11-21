import { Card } from "@/Components/ui/card"
import { Dialog, DialogTrigger } from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { MealModal } from "@/Components/MealModal"
import { cn, generateDateArray } from "@/lib/utils"
import { Head } from "@inertiajs/react"
import { ChevronUpIcon } from "@radix-ui/react-icons"
import { GalleryVerticalEnd, Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/Components/ui/sidebar"

export default function Welcome() {
    const date = new Date()
    return (
        <>
            <Head title="Welcome" />
            <div className="mx-auto bg-background flex flex-col">
                <header>
                    <div className="">
                        <h2 className="px-4 pt-3 pb-2 uppercase text-slate-300 font-bold">
                            {date.toLocaleString("en-US", {
                                month: "long",
                            })}
                        </h2>
                        <Dates />
                    </div>
                </header>

                <main className="flex flex-col w-full flex-1 min-h-0 mt-8 items-center">
                    <div className="flex gap-2 w-full px-4 pt-2 pb-4 text-sm">
                        <div className="px-2 py-1 rounded-lg bg-green-300">
                            1800 calories
                        </div>
                    </div>
                    <ScrollArea className="flex w-full flex-col justify-center items-center">
                        <Card className="max-w-[300px] text-sm mx-auto w-full">
                            <div className="flex flex-col p-6 gap-2">
                                <header className="flex flex-col">
                                    <span className="text-slate-400">
                                        18:15
                                    </span>
                                    <h2 className="font-bold text-base">
                                        Spaghetti Bolgonese
                                    </h2>
                                    <div className="flex text-xs flex-wrap text-[10px] mt-2 gap-x-2 gap-y-1">
                                        <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            913 calories
                                        </span>
                                        <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 protein
                                        </span>
                                        <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 carb
                                        </span>
                                        <span className="bg-yellow-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 fiber
                                        </span>
                                        <span className="bg-orange-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 fats
                                        </span>
                                    </div>
                                </header>
                                <div className="mt-2">
                                    <img
                                        className="w-full rounded h-32 object-cover"
                                        src="https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Card>
                        <div className="flex flex-col items-center">
                            <div className="w-[2px] h-20 bg-slate-200"></div>
                        </div>

                        <Card className="max-w-[300px] mx-auto text-sm w-full">
                            <div className="flex flex-col p-6 gap-2">
                                <header className="flex flex-col">
                                    <span className="text-slate-400">
                                        18:15
                                    </span>
                                    <h2 className="font-bold text-base">
                                        Spaghetti Bolgonese
                                    </h2>
                                    <div className="flex text-xs flex-wrap text-[10px] mt-2 gap-x-2 gap-y-1">
                                        <span className="bg-green-300  text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            913 calories
                                        </span>
                                        <span className="bg-blue-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 protein
                                        </span>
                                        <span className="bg-red-300 text-slate-600 font-bold uppercase py-0.5 px-2 rounded-md">
                                            98 carb
                                        </span>
                                    </div>
                                </header>
                                <div className="mt-2">
                                    <img
                                        className="w-full rounded h-32 object-cover"
                                        src="https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Card>
                        <div className="flex flex-col items-center">
                            <div className="w-[2px] h-14 bg-slate-200"></div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full border-slate-200 border shadow">
                                        <Plus className="text-slate-400" />
                                    </button>
                                </DialogTrigger>
                                <MealModal />
                            </Dialog>
                        </div>
                        <div className="h-8"></div>
                    </ScrollArea>
                </main>
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
                    "w-[14.3%] snap-start opacity-10 flex flex-col py-2 rounded-xl flex-shrink-0 text-center",
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
        <div className="relative">
            <ul
                ref={date_container}
                className="flex border-b border-slate-100 snap-x gap-2 pb-2 w-full overflow-x-auto"
            >
                {date_array.map((date) => (
                    <DateItem key={date.toISOString()} date={date} />
                ))}
            </ul>
            <button className="w-[14.3%] flex items-center justify-center pt-1 absolute left-0">
                <ChevronUpIcon className="w-6 h-6" />
            </button>
        </div>
    )
}

const data = {
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {
                    title: "Installation",
                    url: "#",
                },
                {
                    title: "Project Structure",
                    url: "#",
                },
            ],
        },
        {
            title: "Building Your Application",
            url: "#",
            items: [
                {
                    title: "Routing",
                    url: "#",
                },
                {
                    title: "Data Fetching",
                    url: "#",
                    isActive: true,
                },
                {
                    title: "Rendering",
                    url: "#",
                },
                {
                    title: "Caching",
                    url: "#",
                },
                {
                    title: "Styling",
                    url: "#",
                },
                {
                    title: "Optimizing",
                    url: "#",
                },
                {
                    title: "Configuring",
                    url: "#",
                },
                {
                    title: "Testing",
                    url: "#",
                },
                {
                    title: "Authentication",
                    url: "#",
                },
                {
                    title: "Deploying",
                    url: "#",
                },
                {
                    title: "Upgrading",
                    url: "#",
                },
                {
                    title: "Examples",
                    url: "#",
                },
            ],
        },
        {
            title: "API Reference",
            url: "#",
            items: [
                {
                    title: "Components",
                    url: "#",
                },
                {
                    title: "File Conventions",
                    url: "#",
                },
                {
                    title: "Functions",
                    url: "#",
                },
                {
                    title: "next.config.js Options",
                    url: "#",
                },
                {
                    title: "CLI",
                    url: "#",
                },
                {
                    title: "Edge Runtime",
                    url: "#",
                },
            ],
        },
        {
            title: "Architecture",
            url: "#",
            items: [
                {
                    title: "Accessibility",
                    url: "#",
                },
                {
                    title: "Fast Refresh",
                    url: "#",
                },
                {
                    title: "Next.js Compiler",
                    url: "#",
                },
                {
                    title: "Supported Browsers",
                    url: "#",
                },
                {
                    title: "Turbopack",
                    url: "#",
                },
            ],
        },
        {
            title: "Community",
            url: "#",
            items: [
                {
                    title: "Contribution Guide",
                    url: "#",
                },
            ],
        },
    ],
}
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Documentation
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className="font-medium">
                                        {item.title}
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem
                                                key={item.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={item.isActive}
                                                >
                                                    <a href={item.url}>
                                                        {item.title}
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
