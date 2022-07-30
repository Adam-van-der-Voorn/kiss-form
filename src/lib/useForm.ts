import { FormEvent, useCallback, useMemo, useState } from 'react';
import getKeysFromObject from './private/util/getKeysFromObject';
import getNestedValue from './private/util/getNestedValue';
import { getSuperKeys } from './private/util/keyfinders';
import setNestedValue from './private/util/setNestedValue';
import { Nested } from './types/Nested';
import { Submit } from './types/useFormTypes';

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, _setFormState] = useState(initialData);
    const [records, setRecords] = useState<string[]>(getKeysFromObject(initialData));

    const setFormState = useCallback((name: string, val: Nested<FormInput>) => {
        _setFormState((state: FormInput) => {
            if (name === '') {
                return val;
            }
            const keys = getSuperKeys(name, records);
            for (const key of keys) {
                const nestedVal = getNestedValue(state, key);
                const clone = { ...nestedVal };
                setNestedValue(state, key, clone);
            }
            setNestedValue(state, name, val);
            // may want to set records here for arrays etc in the future...
            return { ...state };
        });
    }, [_setFormState, records]);

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

    const form = useMemo(() => ({
        setFormState
    }), [setFormState]);

    return { formState, register, setFormState, handleSubmit, form };
}