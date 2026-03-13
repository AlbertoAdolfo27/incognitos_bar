import { APIError } from "@/src/shared/api-error/error.js";
import type { ProductCreateDTO, ProductUpdateDTO } from "./dtos/product.dtos.js";
import * as productRepository from "./product.repository.js"
import { CONFLICT_NAME, NOT_FOUND } from "@/src/shared/app-response/response-type.js";

export async function getProducts() {
    return productRepository.getProducts();
}

export async function getProductById(id: string) {
    return productRepository.getProductById(id)
}

export async function getProductByName(name: string) {
    return productRepository.getProductByName(name)
}

export async function addProduct(product: ProductCreateDTO) {
    const resProduct = await getProductByName(product.name)
    if (resProduct) throw new APIError(CONFLICT_NAME)

    return productRepository.addProduct(product)
}

async function checkFoundProduct(id: string) {
    const product = await getProductById(id)
    if (!product) throw new APIError(NOT_FOUND, "Product not found")
    return product
}

export async function updateProduct(id: string, product: ProductUpdateDTO) {
    const resProduct = await checkFoundProduct(id)
    if (product.name) {
        const resProductByName = await getProductByName(product.name)
        if (resProductByName && resProductByName.name === product.name && resProductByName.id !== resProduct.id)
            throw new APIError(CONFLICT_NAME)
    }
    
    return productRepository.updateProduct(id, product)
}

export async function deleteProduct(id: string) {
    await checkFoundProduct(id)

    return productRepository.deleteProduct(id)
}