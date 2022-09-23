import { Flooded } from '../../types/Flooded';
import isObj from './isObj';

export default function flood<T, F>(x: T, valueToFlood: F): Flooded<T, F> {
    if (isObj(x)) {
        const flooded: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(x)) {
            flooded[key] = flood(value, valueToFlood);
        }
        return flooded as Flooded<T, F>;
    }
    else if (Array.isArray(x)) {
        const flooded: unknown[] = [];
        for (let i = 0; i < x.length; i++) {
            flooded[i] = flood(x[i], valueToFlood);
        }
        return flooded as Flooded<T, F>;
    }
    else return valueToFlood as Flooded<T, F>;
}


