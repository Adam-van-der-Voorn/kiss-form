import { FormEvent, SetStateAction } from 'react';
import { Nested } from '../object-state/types/Nested';
import { Flooded } from './Flooded';

export type FormCapsule<T> = {
    _name: string;
    _state: T,
    _touched: Flooded<T, boolean>;
    setStateRoot: (name: string, val: SetStateAction<any>) => void,
    setTouchedRoot: (name: string, val: SetStateAction<Flooded<any, boolean>>) => void,
};

export type FormPartition<T> = {
    touched: Flooded<T, boolean>,
    state: T,
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
