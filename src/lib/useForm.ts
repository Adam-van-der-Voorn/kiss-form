import { FormEvent, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FormErrors, FormCapsule, Submit } from './types/useFormTypes';
import useNestedState from './object-state/useNestedState';
import flood from './private/util/flood';
import { Flooded } from './types/Flooded';
import { Nested } from './object-state/types/Nested';
import objIsEmpty from './private/util/objIsEmpty';

type Opts<T> = {
    validation?: (input: T) => FormErrors<T>;
};

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput>, opts?: Opts<FormInput>) {
    const validation = opts?.validation;
    const [state, setState] = useNestedState(initialData);
    // has to be any internally to avoid 'type instantiation is excessively deep and possibly infinite'
    const [touched, setTouched] = useNestedState<any>(flood(initialData, false));
    const [error, setError] = useState<FormErrors<FormInput>>({});

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
        if (validation) {
            const validationResult = validation(state);
            setError(validationResult);
            if (!objIsEmpty(validationResult)) {
                return;
            }
        }
        onSubmit(state);
    };

    const formCapsule: FormCapsule<FormInput> = useMemo(() => ({
        _touched: touched as Flooded<FormInput, boolean>,
        _setTouched: setTouched as (name: string, val: SetStateAction<Flooded<Nested<FormInput>, boolean>>) => void,
        _setState: setState,
        _register: register,
    }), [setState, register, touched, setTouched]);

    return { touched, error, state, setState, register, handleSubmit, formCapsule };
}