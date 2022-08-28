import { SetStateAction, useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import getNestedValue from './object-state/util/getNestedValue';
import { Flooded } from './types/Flooded';
import { FormInterface } from './types/useFormTypes';

export default function getFormPartition<K extends Record<string, any>>(name: string, form: FormInterface<K>) {
    const { setState, register, touched, setTouched } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const partitionTouched = useMemo(() => {
        const fullName = _getFullName(name);
        return getNestedValue(touched, fullName) as Flooded<K, boolean>
    }, [name, _getFullName])

    const setPartitionTouched = useCallback((subname: string, val: SetStateAction<Flooded<Nested<K>, boolean>>) => {
        const fullName = _getFullName(subname);
        setTouched(fullName, val);
    }, [setTouched, _getFullName]);

    const setPartitionState = useCallback((subname: string, val: SetStateAction<Nested<K>>) => {
        const fullName = _getFullName(subname);
        setState(fullName, val);
    }, [setState, _getFullName]);

    const registerPartition = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return register(fullName);
    }, [register, _getFullName]);

    const partition: FormInterface<K> = useMemo(() => ({
        setState: setPartitionState,
        register: registerPartition,
        touched: partitionTouched,
        setTouched: setPartitionTouched
    }), [ setPartitionState, registerPartition, partitionTouched, setPartitionTouched ])

    return partition;
}