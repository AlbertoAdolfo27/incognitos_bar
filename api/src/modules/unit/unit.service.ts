import { APIError } from "@/src/shared/api-error/error.js"
import * as unitRepository from "./unit.repository.js"
import { CONFLICT_NAME, CONFLICT_UNIT_SYMBOL, NOT_FOUND } from "@/src/shared/app-response/response-type.js"
import type { UnitCreateDTO, UnitUpdateDTO } from "./dtos/unit.dto.js"

export async function getUnits() {
    return unitRepository.getUnits()
}

export async function getUnitById(id: string) {
    return unitRepository.getUnitById(id)
}

export async function getUnitByName(name: string) {
    return unitRepository.getUnitByName(name)
}

export async function getUnitBySymbol(symbol: string) {
    return unitRepository.getUnitBySymbol(symbol)
}

async function checkFoundUnit(id: string) {
    const unit = await getUnitById(id)
    if (!unit) throw new APIError(NOT_FOUND, "Unit not found")
    return unit
}

export async function addUnit(unit: UnitCreateDTO) {
    const resUnitByName = await getUnitByName(unit.name)
    if (resUnitByName) throw new APIError(CONFLICT_NAME)

    const resUnitBySymbol = await getUnitBySymbol(unit.symbol)
    if (resUnitBySymbol) throw new APIError(CONFLICT_UNIT_SYMBOL)

    return unitRepository.addUnit(unit)
}

export async function updateUnit(id: string, unit: UnitUpdateDTO) {
    const resUnit = await checkFoundUnit(id)
    if (unit.name) {
        const resUnitByName = await getUnitByName(unit.name)
        if (resUnitByName && resUnitByName.name === unit.name && resUnitByName.id !== resUnit.id)
            throw new APIError(CONFLICT_NAME)
    }

    if (unit.symbol) {
        const resUnitBySymbol = await getUnitBySymbol(unit.symbol)
        if (resUnitBySymbol && resUnitBySymbol.symbol === unit.symbol && resUnitBySymbol.id !== resUnit.id)
            throw new APIError(CONFLICT_UNIT_SYMBOL)
    }

    return unitRepository.updateUnit(id, unit)
}

export async function deleteUnit(id: string) {
    await checkFoundUnit(id)

    return unitRepository.deleteUnit(id)
}