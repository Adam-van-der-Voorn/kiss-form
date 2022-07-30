import { FormEvent, useCallback, useState } from 'react';
import getKeysFromObject from './getKeysFromObject';
import getNestedValue from './getNestedValue';
import { getSuperKeys } from './keyfinders';
import setNestedValue from './setNestedValue';

type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export default function useForm<FormInput>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, _setFormState] = useState(initialData);
    const [records, setRecords] = useState<string[]>(getKeysFromObject(initialData));

    const setFormState = useCallback((name: string, val: any) => {
        _setFormState((state: FormInput) => {
            const keys = getSuperKeys(name, records);
            for (const key of keys) {
                const val = getNestedValue(state, key);
                const clone = { ...val };
                setNestedValue(state, key, clone);
            }
            setNestedValue(state, name, val);
            // may want to set records here for arrays etc in the future...
            return { ...state };
        });
    }, [_setFormState, records]);

    const register = useCallback((name: string): any => {
        return {
            name: name,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                setFormState(name, ev.currentTarget.value);
            }
        };
    }, [setFormState]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(formState);
    };

    const form = {
        setFormState
    }

    return { formState, register, setFormState, handleSubmit, form };
}