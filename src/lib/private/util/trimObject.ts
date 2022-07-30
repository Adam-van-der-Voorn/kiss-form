import isObj from "./isObj";
import objIsEmpty from "./objIsEmpty";

export default function trimObject(obj: Record<string, any>): Record<string, any> {
    let newObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (isObj(value)) {
            const trimmed = trimObject(value);
            if (!objIsEmpty(trimmed)) {
                newObj[key] = trimmed;
            }
        }
        if (typeof value === 'string' && value.length > 0) {
            newObj[key] = value;
        }
    }
    return newObj;
}
