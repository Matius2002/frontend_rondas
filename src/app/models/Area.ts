import { Zona } from "./Zona"

export interface Area {
    id: number, 
    nombreArea: string, 
    zonas: Zona[],
    enabled: boolean
}