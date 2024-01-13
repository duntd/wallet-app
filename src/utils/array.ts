export const ArrayUtil = {
    //to unique array
    toUniq: <T>(list: ArrayElType<T>[] = [], isDuplicate = (a: ArrayElType<T>, c: ArrayElType<T>) => a === c) => {
        return list.filter((curr, i, arr) => arr.findIndex(acc => isDuplicate(acc, curr)) === i)
    },

    //to sort array
     sort: <T>(array: T[], key: keyof T, order: SortOrder = "asc"): T[] => {
        return [...array].sort((a, b) => {
            const valueA = a[key]
            const valueB = b[key]

            if (typeof valueA === "number" && typeof valueB === "number") {
                return order === "asc" ? valueA - valueB : valueB - valueA
            }

            if (typeof valueA === "string" && typeof valueB === "string") {
                return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
            }

            throw new Error(`Unsupported value types for sorting: ${typeof valueA}, ${typeof valueB}`)
        })
    },
}

type ArrayElType<T> = T extends (infer E)[] ? E[] : T

type SortOrder = "asc" | "desc"