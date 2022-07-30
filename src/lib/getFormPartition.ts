import { FormEvent, useCallback } from 'react';
import { Nested } from './types/Nested';
import { FormInterface } from './types/useFormTypes';

export default function getFormPartition<FormInput extends Record<string, any>>(name: string, form: FormInterface<FormInput>) {
    const { setFormState } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const setPartitionState = useCallback((subname: string, value: Nested<FormInput>) => {
        const fullName = _getFullName(subname);
        setFormState(fullName, value);
    }, [name, setFormState, _getFullName]);

    const register = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return {
            name: fullName,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setPartitionState(subname, ev.currentTarget.value as any);
            }
        };
    }, [name, setFormState, _getFullName]);

    return { register, setPartitionState };
}