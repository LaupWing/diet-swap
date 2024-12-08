import { Meal, Picture } from "@/types"
import axios from "axios"
import { create } from "zustand"

interface MealsState {
    pictures: Picture[]
    setPictures: (meals: Picture[]) => void
    date: Date
    setDate: (date: Date) => void
    fetchPictures: (date: Date) => void
}

export const useMealsStore = create<MealsState>((set) => ({
    pictures: [],
    setPictures: (pictures) => set({ pictures }),
    date: new Date(),
    setDate: (date) => set({ date }),
    fetchPictures: async (date) => {
        console.log(route("meals.date", { date: date.toISOString() }))
        const response = await axios(`/meals?date=${date.toISOString()}`)
        // const pictures = await response.json()
        // console.log(pictures)
    },
}))
