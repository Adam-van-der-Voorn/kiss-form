import { FormEvent, useState } from 'react';
import setNestedValue from './setNestedValue';

type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export default function useForm<FormInput>(initialData: FormInput, onSubmit: Submit<FormInput> /*, config, validation, */) {
    const [formState, setFormState] = useState(initialData);

    function register(name: string): any {
        return {
            name: name,
            onChange: (ev: FormEvent<HTMLInputElement>) => {
                const newState = {...formState};
                setNestedValue(newState, name, ev.currentTarget.value)
                setFormState({...newState});
            }
        }
    }

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(formState);
    }

    return { handleSubmit, register, formState, setFormState };
}