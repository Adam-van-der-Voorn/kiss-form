import { FormEvent, useCallback, useMemo, useState } from 'react';
import getNestedValue from './private/util/getNestedValue';
import { getSuperKeys } from './private/util/keyfinders';
import setNestedValue from './private/util/setNestedValue';
import { shallowCopy } from './private/util/shallowCopy';
import { Collection } from './types/Collection';
import { Nested } from './types/Nested';
import { SetFormStateAction } from './types/setFormStateAction';
import { FormInterface, Submit } from './types/useFormTypes';

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, _setFormState] = useState(initialData);

    const setFormState = useCallback((name: string, val: SetFormStateAction<FormInput>) => {
        _setFormState((prevState: FormInput) => {
            // parse args
            if (val instanceof Function) {
                val = val(prevState);
            }

            // fn body
            if (name === '') {
                return val as Nested<FormInput>;
            }
            const superNames = getSuperKeys(name);
            const newState: FormInput = shallowCopy(prevState);
            for (const currentName of superNames) {
                // we know it is a Collection because it is a <<super>>name
                const currentVal = getNestedValue(prevState, currentName) as Collection;
                setNestedValue(newState, currentName, shallowCopy(currentVal));
            }
            setNestedValue(newState, name, val);
            return newState;
        });
    }, [_setFormState]);

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