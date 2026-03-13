export type ProductCreateDTO = {
    name: string;
    description?: string;
    unitId: string;
    price: number;
    quantity: number;
    createdBy: string;
}

export type ProductUpdateDTO = {
    name: string;
    description?: string;
    unitId: string;
    price: number;
    quantity: number;
}