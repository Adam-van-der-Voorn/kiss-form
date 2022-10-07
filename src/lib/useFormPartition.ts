import { SetStateAction, useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import getNestedValue from './object-state/util/getNestedValue';
import { Flooded } from './types/Flooded';
import { FormCapsule } from './types/useFormTypes';

export default function useFormPartition<K extends Record<string, any>>(name: string, formCapsule: FormCapsule<K>) {
    const {
        _setState: setState,
        _register: register,
        _touched: touched,
        _setTouched: setTouched
    } = formCapsule;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const partitionTouched = useMemo(() => {
        const fullName = _getFullName(name);
        return getNestedValue(touched, fullName) as Flooded<K, boolean>;
    }, [name, _getFullName, touched]);

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

    const partitionCapsule: FormCapsule<K> = useMemo(() => ({
        _setState: setPartitionState,
        _register: registerPartition,
        _touched: partitionTouched,
        _setTouched: setPartitionTouched
    }), [setPartitionState, registerPartition, partitionTouched, setPartitionTouched]);

    return useMemo(() => ({
        touched: partitionTouched,
        /* error???,
        state???, */
        setState: setPartitionState,
        register: registerPartition,
        partitionCapsule
    }), [partitionCapsule, partitionTouched, registerPartition, setPartitionState]);
}