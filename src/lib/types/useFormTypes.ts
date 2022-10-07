import { FormEvent, SetStateAction } from 'react';
import { Nested } from '../object-state/types/Nested';
import { Flooded } from './Flooded';

export type FormCapsule<T> = {
    _touched: Flooded<T, boolean>;
    _setTouched: (name: string, val: SetStateAction<Flooded<Nested<T>, boolean>>) => void,
    _setState: (name: string, val: SetStateAction<Nested<T>>) => void,
    _register: Register;
};

export type FormPartition<T> = {
    touched: Flooded<T, boolean>,
    setState: (name: string, val: SetStateAction<Nested<T>>) => void,
    register: Register,
    partitionCapsule: FormCapsule<T>
};

export type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export type Register = (name: string) => {
    name: string;
    onChange: (ev: FormEvent<HTMLInputElement>) => void;
    onBlur: (ev: FormEvent<HTMLInputElement>) => void;
};

export type FormErrors<T> = Partial<Flooded<T, string>>
