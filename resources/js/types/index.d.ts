export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User
    }
}

interface DataRecord {
    created_at: string
    id: number
    updated_at: string
}

export interface UserGoal extends DataRecord {
    id: number
    user_id: number
    calories: string
    protein: string
    current_bodyfat: string
    goal_bodyfat: string
    meal_plan: string
}
