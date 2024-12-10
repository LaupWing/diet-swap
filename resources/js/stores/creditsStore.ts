import { create } from "zustand"

interface CreditsStore {
    amount: number
    setAmount: (amount: number) => void
}

export const useCreditsStore = create<CreditsStore>((set) => ({
    amount: 0,
    setAmount: (amount) => set({ amount }),
}))
