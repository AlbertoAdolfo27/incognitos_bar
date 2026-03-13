import { prisma } from "@/src/infra/database/prisma.js";
import { ProductSelects } from "../products/product.repository.js";
import type { SubCategoryCreateDTO, SubCategoryUpdateDTO } from "./dtos/subcategory.dtos.js";

export const SubCategorySelects = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
}

export async function getSubCategories() {
    return prisma.subCategory.findMany({
        select: SubCategorySelects
    })
}

export async function getSubCategoryById(id: string) {
    return prisma.subCategory.findUnique({
        select: SubCategorySelects,
        where: { id }
    })
}

export async function getSubCategoryByName(name: string) {
    return prisma.subCategory.findFirst({
        select: SubCategorySelects,
        where: { name }
    })
}

export async function getSubCategoryProducts(id: string) {
    const selects = {
        ...SubCategorySelects,
        products: {
            select: ProductSelects
        }
    }

    return prisma.subCategory.findMany({
        select: selects,
        where: { id }
    })
}

export async function addSubCategory(subCategory: SubCategoryCreateDTO) {
    return prisma.subCategory.create({
        select: SubCategorySelects,
        data: subCategory,
    })
}

export async function updateSubCategory(id: string, subCategory: SubCategoryUpdateDTO) {
    return prisma.subCategory.update({
        select: SubCategorySelects,
        data: subCategory,
        where: { id }
    })
}

export async function deleteSubCategory(id: string) {
    return prisma.subCategory.delete({
        where: { id }
    })
}