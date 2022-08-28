import isObj from "./isObj";

export default function getKeysFromObject(obj: Record<string, unknown>) {
    return _getKeysFromObject(obj, undefined);
}

function _getKeysFromObject(obj: Record<string, unknown>, prefix?: string) {
    const keys: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix
            ? `${prefix}.${key}`
            : key;

        keys.push(fullKey);

        if (isObj(value)) {
            const nested_keys = _getKeysFromObject(value, fullKey);
            keys.push(...nested_keys);
        }
    }
    return keys;
}