import { FormEvent, useCallback, useMemo } from 'react';
import { FormInterface, Submit } from './types/useFormTypes';
import useNestedState from './object-state/useNestedState';
import flood from './private/util/flood';
import { Flooded } from './types/flooded';

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, setFormState] = useNestedState(initialData);
    const [touched, setTouched] = useNestedState<any>(flood(initialData, false))

    const register = useCallback((name: string) => {
        return {
            name: name,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setFormState(name, ev.currentTarget.value as any);
            },
            onBlur: (ev: FormEvent<HTMLInputElement>) => {
                setTouched(name, true as any)
            }
        };
    }, [setFormState]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(formState);
    };

    const form: FormInterface<FormInput> = useMemo(() => ({
        touched,
        setTouched,
        setFormState,
        register
    }), [setFormState, register, touched, setTouched]);

    return { formState, touched: touched as Flooded<FormInput, boolean>, register, setFormState, handleSubmit, form };
}