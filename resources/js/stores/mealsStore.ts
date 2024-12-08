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
        const response = await axios(
            route("meals.date", { date: date.toISOString() })
        )

        set({ pictures: response.data.meals })
        // const pictures = await response.json()
        // console.log(pictures)
    },
}))
