import { Meal } from "@/types"
import { create } from "zustand"

interface MealsState {
    meals: Meal[]
    setMeals: (meals: Meal[]) => void
    date: Date
}

export const useUserSettingsStore = create<MealsState>((set) => ({
    meals: [],
    setMeals: (meals) => set({ meals }),
    date: new Date(),
}))
