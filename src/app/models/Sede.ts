import { Piso } from "./Piso";

export interface Sede{
    id: number, 
    nombreSede: string,
    pisos: Piso[],
    enabled: boolean
}