import AsyncStorage from "@react-native-async-storage/async-storage"

export const ConfigUtil = {
     // Returns a null string if there is no value
    getStorage: async <P>(keys: Keys): Promise<Keys extends Array<any> ? Array<P | null> : P | null> => {
        const checkItem = (item: string | null) => {

            if (item !== null && item !== "null") {
                try {
                    return JSON.parse(item)
                } catch (error) {
                    return item
                }
            } else {
                return null
            }
        }

        if (Array.isArray(keys)) {
            let list = []

            for (const key of keys) {
                const item = await AsyncStorage.getItem(key)

                list.push(checkItem(item))
            }

            return list as P
        } else {
            const item = await AsyncStorage.getItem(keys)

            return checkItem(item) as P | null
        }
    },

    setStorage: async <P>(obj: { [key: string]: P }) => {
        for (const key in obj) {
            await AsyncStorage.setItem(key, `${obj[key]}`)
        }
    },
    
    removeStorage: async (keys: string[] | string) => {
        if (Array.isArray(keys)) {
            for (const key of keys) {
                await AsyncStorage.removeItem(key)
            }
        } else {
            await AsyncStorage.removeItem(keys)
        }
    },
}

type Keys = string | string[]