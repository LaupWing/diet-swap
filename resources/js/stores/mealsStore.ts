import { Meal, Picture } from "@/types"
import { create } from "zustand"

interface MealsState {
    pictures: Picture[]
    setPictures: (meals: Picture[]) => void
    date: Date
    setDate: (date: Date) => void
}

export const useMealsStore = create<MealsState>((set) => ({
    pictures: [],
    setPictures: (pictures) => set({ pictures }),
    date: new Date(),
    setDate: (date) => set({ date }),
}))
