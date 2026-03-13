export type CategoryCreateDTO = {
    name: string;
    description?: string;
}

export type CategoryUpdateDTO = {
    name?: string;
    description?: string;
}