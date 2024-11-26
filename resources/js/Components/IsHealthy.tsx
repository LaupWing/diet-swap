import { cn } from "@/lib/utils"
import React, { FC } from "react"

export const IsHealthy: FC<{
    healthy: string
    className?: string
}> = ({ healthy, className }) => {
    if (healthy === "neutral")
        return (
            <div
                className={cn(
                    className,
                    "rounded-full bg-background px-2 py-[2px] text-xs uppercase font-bold text-yellow-500"
                )}
            >
                It's okay 👍
            </div>
        )
    else if (healthy === "healthy") {
        return (
            <div
                className={cn(
                    className,
                    "rounded-full bg-background px-2 py-[2px] text-xs uppercase font-bold text-green-500"
                )}
            >
                Healthy 😃
            </div>
        )
    } else if (healthy === "unhealthy") {
        return (
            <div
                className={cn(
                    className,
                    "rounded-full bg-background px-2 py-[2px] text-xs uppercase font-bold text-red-400"
                )}
            >
                Unhealthy ☹️
            </div>
        )
    }
}
