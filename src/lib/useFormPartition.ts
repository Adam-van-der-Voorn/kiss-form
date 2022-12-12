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
        _touched,
        setStateRoot,
        setTouchedRoot,
    } = formCapsule;

    const absoluteName = useMemo(() => {
        return concatName(baseName, relativeName);
    }, [baseName, relativeName]);

    const touched = getNestedValue(_touched, relativeName) as Flooded<Sub, boolean>;
    const state = getNestedValue(_state, relativeName) as Sub;

    const setState = useCallback((subname: string, val: SetStateAction<Nested<Sub>>) => {
        const name = concatName(absoluteName, subname);
        setStateRoot(name, val as any);
    }, [absoluteName, setStateRoot]);

    const registerPartition: Register = useCallback((subname: string) => {
        const name = concatName(absoluteName, subname);
        const value = getNestedValue(state, subname);
        const onChange = (ev: FormEvent<HTMLInputElement>) => {
            setStateRoot(name, ev.currentTarget.value as any);
        };
        const onBlur = () => {
            setTouchedRoot(name, true as any);
        };
        return { name, value, onChange, onBlur };
    }, [absoluteName, setStateRoot, setTouchedRoot, state]);

    const partitionCapsule: FormCapsule<Sub> = useMemo(() => ({
        _name: absoluteName,
        _state: state,
        _touched: touched,
        setStateRoot,
        setTouchedRoot
    }), [absoluteName, state, touched, setStateRoot, setTouchedRoot]);

    return useMemo(() => ({
        touched,
        /* error???,*/
        state, 
        setState,
        register: registerPartition,
        partitionCapsule
    }), [partitionCapsule, registerPartition, setState, state, touched]);
}