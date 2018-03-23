export type Group = 'admin' | 'user'

export interface User {
    id: number
    username: string
    group: Group
}

export interface Topic {
    id: number
    user: User
    title: string
    text: string
    posts: Post[]
}

export interface Post {
    id: number
    user: User
    text: string
}

export interface AuthResponse {
    status: number
    token?: string
    error?: string
    user?: User
}