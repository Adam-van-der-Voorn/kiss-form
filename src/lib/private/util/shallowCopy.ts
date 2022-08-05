import { Collection } from "../../types/Collection";
import isObj from "./isObj";

export function shallowCopy<T extends Collection>(x: T): T {
    if (isObj(x)) {
        return { ...x };
    }
    else if (Array.isArray(x)) {
        return [...x] as T;
    }
    else throw new Error(`shallowCopy: provided value ${x} not a valid datatype`);
}