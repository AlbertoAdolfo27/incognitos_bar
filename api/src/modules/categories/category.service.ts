import { APIError } from "@/src/shared/api-error/error.js";
import * as categoryRepository from "./category.repository.js"
import type { CategoryCreateDTO, CategoryUpdateDTO } from "./dtos/category.dtos.js";
import { CONFLICT_NAME, NOT_FOUND } from "@/src/shared/app-response/response-type.js";

export async function getCategories() {
    return categoryRepository.getCategories()
}

export async function getCategoryById(id: string) {
    return categoryRepository.getCategoryById(id)
}

export async function getCategoryByName(name: string) {
    return categoryRepository.getCategoryByName(name)
}

export async function getCategoryProducts(id: string) {
    return categoryRepository.getCategoryProducts(id)
}

async function checkFoundCategory(id: string) {
    const category = await getCategoryById(id)
    if (!category) throw new APIError(NOT_FOUND, "Category not found")
    return category
}

export async function addCategory(category: CategoryCreateDTO) {
    const resCategory = await getCategoryByName(category.name)
    if (resCategory) throw new APIError(CONFLICT_NAME)

    return categoryRepository.addCategory(category)

}

export async function updateCategory(id: string, category: CategoryUpdateDTO) {
    const resCategory = await checkFoundCategory(id)
    if (category.name) {
        const resCategoryByName = await getCategoryByName(category.name)
        if (resCategoryByName && resCategoryByName.name === category.name && resCategoryByName.id !== resCategory.id)
            throw new APIError(CONFLICT_NAME)
    }

    return categoryRepository.updateCategory(id, category)
}

export async function deleteCategory(id: string) {
    await checkFoundCategory(id)

    return categoryRepository.deleteCategory(id)
}