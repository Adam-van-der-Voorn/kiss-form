import { FormEvent, useCallback } from 'react';
import { Nested } from './types/Nested';
import { FormInterface } from './types/useFormTypes';

export default function getFormPartition<FormInput extends Record<string, any>>(name: string, form: FormInterface<FormInput>) {
    const { setFormState, register } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const setPartitionState = useCallback((subname: string, value: Nested<FormInput>) => {
        const fullName = _getFullName(subname);
        setFormState(fullName, value);
    }, [name, setFormState, _getFullName]);

    const registerPartition = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return register(fullName)
    }, [name, setFormState, _getFullName]);

    return { registerPartition, setPartitionState };
}