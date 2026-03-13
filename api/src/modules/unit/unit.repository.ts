import { prisma } from "@/src/infra/database/prisma.js";
import type { UnitCreateDTO, UnitUpdateDTO } from "./dtos/unit.dto.js";

export async function getUnits() {
    return prisma.unit.findMany()
}

export async function getUnitById(id: string) {
    return prisma.unit.findUnique({
        where: { id }
    })
}

export async function getUnitByName(name: string) {
    return prisma.unit.findFirst({
        where: { name }
    })
}

export async function getUnitBySymbol(symbol: string) {
    return prisma.unit.findFirst({
        where: { symbol }
    })
}

export async function addUnit(unit: UnitCreateDTO) {
    return prisma.unit.create({
        data: unit
    })
}

export async function updateUnit(id: string, unit: UnitUpdateDTO) {
    return prisma.unit.update({
        where: { id },
        data: unit
    })
}

export async function deleteUnit(id: string) {
    return prisma.unit.delete({
        where: { id },
    })
}