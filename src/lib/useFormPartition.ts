import { FormEvent, SetStateAction, useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import getNestedValue from './object-state/util/getNestedValue';
import { Flooded } from './types/Flooded';
import { FormCapsule, FormPartition, Register } from './types/useFormTypes';
import concatName from './private/util/concatName';

export default function useFormPartition<Base extends Record<string, unknown>, Sub extends Nested<Base>>(relativeName: string, formCapsule: FormCapsule<Base>): FormPartition<Sub> {
    const {
        _name: baseName,
        _state,
        _error,
        _touched,
        _register,
        setStateRoot,
        setErrorRoot,
        setTouchedRoot,
        validateRef,
    } = formCapsule;

    const absoluteName = useMemo(() => {
        return concatName(baseName, relativeName);
    }, [baseName, relativeName]);

    const touched = getNestedValue(_touched, relativeName) as Flooded<Sub, boolean>;
    const state = getNestedValue(_state, relativeName) as Sub;
    const error = getNestedValue(_error, relativeName) as Flooded<Sub, string>;

    const setState = useCallback((subname: string, val: SetStateAction<Nested<Sub>>) => {
        const name = concatName(absoluteName, subname);
        setStateRoot(name, val as any);
    }, [absoluteName, setStateRoot]);

    const registerPartition: Register = useCallback((subname: string) => {
        const name = concatName(absoluteName, subname);
        const value = getNestedValue(state, subname);
        return _register(name, value);
    }, [_register, absoluteName, state]);

    const partitionCapsule: FormCapsule<Sub> = useMemo(() => ({
        _name: absoluteName,
        _state: state,
        _error: error,
        _touched: touched,
        _register,
        validateRef,
        setStateRoot,
        setErrorRoot,
        setTouchedRoot
    }), [absoluteName, state, error, touched, _register, validateRef, setStateRoot, setErrorRoot, setTouchedRoot]);

    return useMemo(() => ({
        touched,
        error,
        state, 
        setState,
        register: registerPartition,
        partitionCapsule
    }), [error, partitionCapsule, registerPartition, setState, state, touched]);
}