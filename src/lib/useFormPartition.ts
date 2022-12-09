import { SetStateAction, useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import getNestedValue from './object-state/util/getNestedValue';
import { Flooded } from './types/Flooded';
import { FormCapsule, FormPartition } from './types/useFormTypes';

export default function useFormPartition<Base extends Record<string, unknown>, Sub extends Nested<Base>>(name: string, formCapsule: FormCapsule<Base>): FormPartition<Sub> {
    const {
        _setState: setState,
        _register: register,
        _touched: touched,
        _state: state,
        _setTouched: setTouched
    } = formCapsule;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const partitionTouched = useMemo(() => {
        return getNestedValue(touched, name) as Flooded<Sub, boolean>;
    }, [name, touched]);

    const setPartitionTouched = useCallback((subname: string, val: SetStateAction<Flooded<Nested<Sub>, boolean>>) => {
        const fullName = _getFullName(subname);
        setTouched(fullName, val as any);
    }, [setTouched, _getFullName]);

    const partitionState = useMemo(() => {
        return getNestedValue(state, name) as Sub;
    }, [name, state]);

    const setPartitionState = useCallback((subname: string, val: SetStateAction<Nested<Sub>>) => {
        const fullName = _getFullName(subname);
        setState(fullName, val as any);
    }, [setState, _getFullName]);

    const registerPartition = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return register(fullName);
    }, [register, _getFullName]);

    const partitionCapsule: FormCapsule<Sub> = useMemo(() => ({
        _state: partitionState,
        _setState: setPartitionState,
        _register: registerPartition,
        _touched: partitionTouched,
        _setTouched: setPartitionTouched
    }), [partitionState, setPartitionState, registerPartition, partitionTouched, setPartitionTouched]);

    return useMemo(() => ({
        touched: partitionTouched,
        /* error???,*/
        state: partitionState, 
        setState: setPartitionState,
        register: registerPartition,
        partitionCapsule
    }), [partitionCapsule, partitionState, partitionTouched, registerPartition, setPartitionState]);
}