import { FormEvent, SetStateAction, useCallback, useMemo } from 'react';
import { FormInterface, Submit } from './types/useFormTypes';
import useNestedState from './object-state/useNestedState';
import flood from './private/util/flood';
import { Flooded } from './types/Flooded';
import { Nested } from './object-state/types/Nested';

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [state, setState] = useNestedState(initialData);
    // has to be any internally to avoid 'type instantiation is excessively deep and possibly infinite'
    const [touched, setTouched] = useNestedState<any>(flood(initialData, false));

    const register = useCallback((name: string) => {
        return {
            name: name,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setState(name, ev.currentTarget.value as any);
            },
            onBlur: () => {
                setTouched(name, true as any);
            }
        };
    }, [setState, setTouched]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(state);
    };

    
    const form: FormInterface<FormInput> = useMemo(() => ({
        touched: touched as Flooded<FormInput, boolean>,
        setTouched: setTouched as (name: string, val: SetStateAction<Flooded<Nested<FormInput>, boolean>>) => void,
        setState,
        register
    }), [setState, register, touched, setTouched]);

    return { state, handleSubmit, form };
}