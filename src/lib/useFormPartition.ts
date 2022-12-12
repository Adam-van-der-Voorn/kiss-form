import { FormEvent, SetStateAction, useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import getNestedValue from './object-state/util/getNestedValue';
import { Flooded } from './types/Flooded';
import { FormCapsule, FormPartition, Register } from './types/useFormTypes';
import concatName from './private/util/concatName';

export default function useFormPartition<Base extends Record<string, unknown>, Sub extends Nested<Base>>(relativeName: string, formCapsule: FormCapsule<Base>): FormPartition<Sub> {
    const {
        _setState,
        _touched,
        _state,
        _setTouched,
        _name: baseName
    } = formCapsule;

    const absoluteName = useMemo(() => {
        return concatName(baseName, relativeName);
    }, [baseName, relativeName]);

    const touched = getNestedValue(_touched, relativeName) as Flooded<Sub, boolean>;

    const setTouched = useCallback((subname: string, val: SetStateAction<Flooded<Nested<Sub>, boolean>>) => {
        const name = concatName(relativeName, subname);
        _setTouched(name, val as any);
    }, [relativeName, _setTouched]);

    const state = getNestedValue(_state, relativeName) as Sub;

    const setState = useCallback((subname: string, val: SetStateAction<Nested<Sub>>) => {
        const name = concatName(relativeName, subname);
        _setState(name, val as any);
    }, [relativeName, _setState]);

    const registerPartition: Register = useCallback((subname: string) => {
        const name = concatName(absoluteName, subname);
        const value = getNestedValue(state, subname);
        const onChange = (ev: FormEvent<HTMLInputElement>) => {
            _setState(name, ev.currentTarget.value as any);
        };
        const onBlur = () => {
            _setTouched(name, true as any);
        };
        return { name, value, onChange, onBlur };
    }, [absoluteName, _setState, _setTouched, state]);

    const partitionCapsule: FormCapsule<Sub> = useMemo(() => ({
        _state: state,
        _setState: setState,
        _name: absoluteName,
        _touched: touched,
        _setTouched: setTouched
    }), [state, setState, absoluteName, touched, setTouched]);

    return useMemo(() => ({
        touched,
        /* error???,*/
        state, 
        setState,
        register: registerPartition,
        partitionCapsule
    }), [partitionCapsule, registerPartition, setState, state, touched]);
}