import { useCallback, useMemo } from 'react';
import getNestedValue from './object-state/util/getNestedValue';
import { SetFormStateAction } from './types/setFormStateAction';
import { FormInterface } from './types/useFormTypes';

export default function getFormPartition<FormInput extends Record<string, any>>(name: string, form: FormInterface<FormInput>) {
    const { setFormState, register, touched, setTouched } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const partitionTouched = getNestedValue(touched, name)

    const setPartitionState = useCallback((subname: string, val: SetFormStateAction<FormInput>) => {
        const fullName = _getFullName(subname);
        setFormState(fullName, val);
    }, [name, setFormState, _getFullName]);

    const setPartitionTouched = useCallback((subname: string, val: any) => {
        const fullName = _getFullName(subname);
        setTouched(fullName, val)
    }, [name, setTouched, _getFullName])

    const registerPartition = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return register(fullName);
    }, [name, setFormState, _getFullName]);

    const partition: FormInterface<FormInput> = useMemo(() => ({
        setFormState: setPartitionState,
        register: registerPartition,
        touched: partitionTouched as any,
        setTouched: setPartitionTouched,
    }), [ setPartitionState, registerPartition, partitionTouched, setTouched])

    return { registerPartition, setPartitionState, partitionTouched, partition };
}