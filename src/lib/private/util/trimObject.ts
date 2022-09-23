import isObj from './isObj';
import objIsEmpty from './objIsEmpty';

export default function trimObject(obj: Record<string, unknown>): Record<string, unknown> {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (isObj(value)) {
            const trimmed = trimObject(value);
            if (!objIsEmpty(trimmed)) {
                newObj[key] = trimmed;
            }
        }
        if ((typeof value === 'string' || Array.isArray(value)) && value.length > 0) {
            newObj[key] = value;
        }
    }
    return newObj;
}
