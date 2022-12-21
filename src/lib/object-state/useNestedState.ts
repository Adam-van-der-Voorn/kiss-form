import { SetStateAction, useCallback, useState } from 'react';
import { Nested } from './types/Nested';
import getNestedValue from './util/getNestedValue';
import { getSuperKeys } from './util/keyfinders';
import setNestedValue from './util/setNestedValue';
import { shallowCopy } from './util/shallowCopy';


export default function useNestedState<T>(initialState: T | (() => T)): [T, (key: string, val: SetStateAction<Nested<T>>) => void] {
    const [state, _setState] = useState(initialState);

    const setState = useCallback((key: string, val: SetStateAction<Nested<T>>) => {
        _setState((prevFullState: T) => {
            // get previous state
            const prevState = key !== ''
                ? getNestedValue(prevFullState, key)
                : prevFullState as Nested<T>; // T and Nested<T> dont union well...

            if (prevState === undefined) {
                console.error(`kiss-form: Attempted to set state but key '${key}' does not exist in`, prevFullState);
                return prevFullState;
            }

            // parse args
            if (val instanceof Function) {
                val = val(prevState);
            }

            // if the new nested value === the old nested value,
            // we want to bail out of the state change
            if (val === prevState) {
                return prevFullState;
            }

            // main fn body
            if (key === '') {
                return val as T;
            }
            const superKeys = getSuperKeys(key);
            const newState: T = shallowCopy(prevFullState);
            for (const currentKey of superKeys) {
                const currentVal = getNestedValue(prevFullState, currentKey);
                setNestedValue(newState, currentKey, shallowCopy(currentVal));
            }
            setNestedValue(newState, key, val);
            return newState;
        });
    }, [_setState]);

    return [state, setState];
}