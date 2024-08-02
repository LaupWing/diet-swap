import { Head } from "@inertiajs/react"
export default function Welcome() {
    const date = new Date()
    return (
        <>
            <Head title="Welcome" />
            <div className="w-screen h-screen bg-background">
                <header>
                    <div className="p-4 py-2">
                        <h2 className="text-2xl font-bold">
                            {date.toLocaleString("en-US", {
                                month: "long",
                            })}
                        </h2>
                        {/* <Dates /> */}
                    </div>
                </header>
            </div>
        </>
    )
}
