import { prisma } from "@/src/infra/database/prisma.js";
import type { ProductCreateDTO, ProductUpdateDTO } from "./dtos/product.dtos.js";

export const ProductSelects = {
    id: true,
    name: true,
    description: true,
    quantity: true,
    unitId: true,
    price: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
}

export async function getProducts() {
    return prisma.product.findMany({
        select: ProductSelects,
        where: {
            deletedAt: null
        }
    })
}

export async function getProductById(id: string) {
    return prisma.product.findUnique({
        select: ProductSelects,
        where: {
            id,
            deletedAt: null
        }
    })
}

export async function getProductByName(name: string) {
    return prisma.product.findFirst({
        select: ProductSelects,
        where: {
            name,
            deletedAt: null
        }
    })
}

export async function addProduct(product: ProductCreateDTO) {
    return prisma.product.create({
        select: ProductSelects,
        data: product
    })
}

export async function updateProduct(id: string, product: ProductUpdateDTO) {
    return prisma.product.update({
        select: ProductSelects,
        where: {
            id,
            deletedAt: null
        },
        data: product
    })
}

export async function deleteProduct(id: string) {
    return prisma.product.update({
        select: null,
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    })
}
// ------------------------------------------------------------------------------------------------
// Product category

export async function getProductsInCategory(categoryId: string) {
    return prisma.productCategory.findMany({
        select: ProductSelects,
        where: {
            categoryId
        }
    })
}

export async function getProductsNotInCategory(categoryId: string) {
    const productsInCategory = await getProductsInCategory(categoryId)

    return prisma.productCategory.findMany({
        select: ProductSelects,
        where: {
            categoryId: {
                notIn: productsInCategory.map(product => product.id)
            }
        }
    })
}

export async function addProductToCategory(productId: string, categoryId: string) {
    return prisma.productCategory.create({
        select: {
            productId: true,
            categoryId: true
        },
        data: {
            productId,
            categoryId
        }
    })
}

export async function removeProductFromCategory(productId: string, categoryId: string) {
    return prisma.productCategory.deleteMany({
        where: {
            productId,
            categoryId
        }
    })
}

// ------------------------------------------------------------------------------------------------
// Product sub category

export async function getProductsInSubCategory(subCategoryId: string) {
    return prisma.productSubCategory.findMany({
        select: ProductSelects,
        where: {
            subCategoryId
        }
    })
}

export async function getProductsNotInSubCategory(subCategoryId: string) {
    const productsInSubCategory = await getProductsInSubCategory(subCategoryId)

    return prisma.productSubCategory.findMany({
        select: ProductSelects,
        where: {
            subCategoryId: {
                notIn: productsInSubCategory.map(product => product.id)
            }
        }
    })
}

export async function addProductToSubCategory(productId: string, subCategoryId: string) {
    return prisma.productSubCategory.create({
        select: {
            productId: true,
            subCategoryId: true
        },
        data: {
            productId,
            subCategoryId
        }
    })
}

export async function removeProductFromSubCategory(productId: string, subCategoryId: string) {
    return prisma.productSubCategory.deleteMany({
        where: {
            productId,
            subCategoryId
        }
    })
}
