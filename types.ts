export interface Client {
    id: number
    first_name: string
    last_name?: string
    email: string
    mobile?: number
    postal_code?: number,
    created_at: Date
}

export interface Session {
    id: number
    duration: number
    location?: string
    type: string
    sd_card?: number
    created_at: Date
}
