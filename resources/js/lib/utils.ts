import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateDateArray(start_date: Date, end_date: Date) {
    const dates = []
    let current_date = new Date(start_date)

    while (current_date <= end_date) {
        dates.push(new Date(current_date))
        current_date.setDate(current_date.getDate() + 1)
    }

    return dates
}
