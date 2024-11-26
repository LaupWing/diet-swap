import { Meal, Picture } from "@/types"
import { create } from "zustand"

interface MealsState {
    pictures: Picture[]
    setPictures: (meals: Picture[]) => void
    date: Date
}

export const useMealsStore = create<MealsState>((set) => ({
    pictures: [],
    setPictures: (pictures) => set({ pictures }),
    date: new Date(),
}))
