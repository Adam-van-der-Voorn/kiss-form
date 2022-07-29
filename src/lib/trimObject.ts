import isObj from "./util/isObj";
import objIsEmpty from "./util/objIsEmpty";

export default function trimObject(obj: any): any {
    let newObj: any = {};
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
