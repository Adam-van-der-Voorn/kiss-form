import { useCallback, useMemo } from 'react';
import getNestedValue from './private/util/getNestedValue';
import { Nested } from './types/Nested';
import { SetFormStateAction } from './types/setFormStateAction';
import { FormInterface } from './types/useFormTypes';

export default function getFormPartition<FormInput extends Record<string, any>>(name: string, form: FormInterface<FormInput>) {
    const { setFormState, register } = form;

    const _getFullName = useCallback((subname: string) => {
        return subname.length > 1
            ? `${name}.${subname}`
            : name;
    }, [name]);

    const setPartitionState = useCallback((subname: string, val: SetFormStateAction<FormInput>) => {
        const fullName = _getFullName(subname);
        setFormState(fullName, (prevState: FormInput) => {
            if (val instanceof Function) {
                val = val(getNestedValue(prevState, fullName) as Nested<FormInput>);
            }
            return val as Nested<FormInput>;
        });
    }, [name, setFormState, _getFullName]);

    const registerPartition = useCallback((subname: string) => {
        const fullName = _getFullName(subname);
        return register(fullName);
    }, [name, setFormState, _getFullName]);

    const partition: FormInterface<FormInput> = useMemo(() => ({
        setFormState: setPartitionState,
        register: registerPartition
    }), [setPartitionState])

    return { registerPartition, setPartitionState, partition };
}