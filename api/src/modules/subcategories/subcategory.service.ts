import { APIError } from "@/src/shared/api-error/error.js";
import * as subCategoryRepository from "./subcategory.repositiry.js"
import type { SubCategoryCreateDTO, SubCategoryUpdateDTO } from "./dtos/subcategory.dtos.js"
import { CONFLICT_NAME, NOT_FOUND } from "@/src/shared/app-response/response-type.js";

export async function getSubCategories() {
    return subCategoryRepository.getSubCategories()
}

export async function getSubCategoryById(id: string) {
    return subCategoryRepository.getSubCategoryById(id)
}

export async function getSubCategoryByName(name: string) {
    return subCategoryRepository.getSubCategoryByName(name)
}

export async function getSubCategoryProducts(id: string) {
    return subCategoryRepository.getSubCategoryProducts(id)
}

async function checkFoundSubCategory(id: string) {
    const subCategory = await getSubCategoryById(id)
    if (!subCategory) throw new APIError(NOT_FOUND, "SubCategory not found")
    return subCategory
}

export async function addSubCategory(subCategory: SubCategoryCreateDTO) {
    const resSubCategory = await getSubCategoryByName(subCategory.name)
    if (resSubCategory) throw new APIError(CONFLICT_NAME)

    return subCategoryRepository.addSubCategory(subCategory)

}

export async function updateSubCategory(id: string, subCategory: SubCategoryUpdateDTO) {
    const resSubCategory = await checkFoundSubCategory(id)
    if (subCategory.name) {
        const resSubCategoryByName = await getSubCategoryByName(subCategory.name)
        if (resSubCategoryByName && resSubCategoryByName.name === subCategory.name && resSubCategoryByName.id !== resSubCategory.id)
            throw new APIError(CONFLICT_NAME)
    }

    return subCategoryRepository.updateSubCategory(id, subCategory)
}

export async function deleteSubCategory(id: string) {
    await checkFoundSubCategory(id)

    return subCategoryRepository.deleteSubCategory(id)
}