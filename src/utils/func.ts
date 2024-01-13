export const FuncUtil = {
    //Sequence of functions
    sequence:
        (...fns: any[]) =>
        (...args: any[]) => {
            fns.forEach(fn => fn && fn(...args))
        },

    //Run sequence function from left to right
    pipe: (...fns: ((...prarms: any) => any)[]) => {
        const wrapper = (...args: any) => {
            let _args = args
            fns.forEach(fn => (_args = [fn(..._args)]))

            return _args[0]
        }
        // From i of the second function, the parameter is the return value of the previous function.

        //   pipe(
        //     i => i + 1,
        //     i => i + 2,
        //     i => i + 3
        //   )(1)
        // => 7
        return wrapper
    },

    debounce: (func: (...params: any) => Promise<void>, time: number) => {
        let timeoutId: NodeJS.Timeout | null = null

        const cancel = () => {
            if (timeoutId !== null) clearTimeout(timeoutId)
        }

        const wrapper = (...args: any) => {
            cancel()
            timeoutId = setTimeout(async () => {
                timeoutId = null
                await func(...args)
            }, time)
        }

        wrapper.cancel = cancel

        return wrapper
    },

    wait: async (sec: number) => {
        await new Promise(resolve => setTimeout(resolve, sec))
    },

    waitList: (list = []) => {
        const wrapper = async (func = async (data: any) => {}) => {
            let flag: any = true

            await Promise.all(
                list.map(async data => {
                    flag = await func(data)
                })
            )

            return flag
        }

        // const removeAll = waitList(cor)
        // const result = await removeAll(async data => await api.remove(data))

        // result && ...afterBehavior

        return wrapper
    },
}
