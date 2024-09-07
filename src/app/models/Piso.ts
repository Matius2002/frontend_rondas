import { Area } from "./Area"

export interface Piso {
    id: number, 
    numeroPiso: string,
    areas: Area[],
    enabled: boolean
}