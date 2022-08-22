import { FormEvent, useCallback, useMemo } from 'react';
import { FormInterface, Submit } from './types/useFormTypes';
import useNestedState from './object-state/useNestedState';

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, setFormState] = useNestedState(initialData);

    const register = useCallback((name: string) => {
        return {
            name: name,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setFormState(name, ev.currentTarget.value as any);
            }
        };
    }, [setFormState]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(formState);
    };

    const form: FormInterface<FormInput> = useMemo(() => ({
        setFormState,
        register
    }), [setFormState, register]);

    return { formState, register, setFormState, handleSubmit, form };
}