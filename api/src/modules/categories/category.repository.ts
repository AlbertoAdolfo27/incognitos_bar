import { prisma } from "@/src/infra/database/prisma.js";
import { ProductSelects } from "../products/product.repository.js";
import type { CategoryCreateDTO, CategoryUpdateDTO } from "./dtos/category.dtos.js";

export const CategorySelects = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
}

export async function getCategories() {
    return prisma.category.findMany({
        select: CategorySelects
    })
}

export async function getCategoryById(id: string) {
    return prisma.category.findUnique({
        select: CategorySelects,
        where: { id }
    })
}

export async function getCategoryByName(name: string) {
    return prisma.category.findFirst({
        select: CategorySelects,
        where: { name }
    })
}

export async function getCategoryProducts(id: string) {
    const selects = {
        ...CategorySelects,
        products: {
            select: ProductSelects
        }
    }

    return prisma.category.findMany({
        select: selects,
        where: { id }
    })
}

export async function addCategory(category: CategoryCreateDTO) {
    return prisma.category.create({
        select: CategorySelects,
        data: category,
    })
}

export async function updateCategory(id: string, category: CategoryUpdateDTO) {
    return prisma.category.update({
        select: CategorySelects,
        data: category,
        where: { id }
    })
}

export async function deleteCategory(id: string) {
    return prisma.category.delete({
        where: { id }
    })
}