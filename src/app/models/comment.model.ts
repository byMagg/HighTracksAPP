import { Coords } from "./coords.model"

export interface Comment {
    _id: string
    author: string
    text: string
    score: number
    location?: Coords
}