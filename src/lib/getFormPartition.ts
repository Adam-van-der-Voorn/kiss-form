import { FormEvent, useCallback } from 'react';

export default function getFormPartition(name: string, form: any) {
    const { setFormState } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const setPartitionState = useCallback((subname: string, value: any) => {
        const fullName = _getFullName(subname);
        setFormState(fullName, value);
    }, [name, setFormState, _getFullName]);

    const register = useCallback((subname: string): any => {
        const fullName = _getFullName(subname);
        return {
            name: fullName,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setPartitionState(subname, ev.currentTarget.value);
            }
        };
    }, [name, setFormState, _getFullName]);

    return { register, setPartitionState };
}