export type UnitCreateDTO = {
    name: string;
    description?: string;
    symbol: string
}

export type UnitUpdateDTO = {
    name?: string;
    description?: string;
    symbol?: string
}