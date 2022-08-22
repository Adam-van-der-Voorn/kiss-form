import isObj from "../../private/util/isObj";

export function shallowCopy<T>(x: T): T {
    if (isObj(x)) {
        return { ...x };
    }
    else if (Array.isArray(x)) {
        return [...x] as any;
    }
    else return x;
}