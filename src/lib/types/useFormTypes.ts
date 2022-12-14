import { FormEvent, SetStateAction } from 'react';
import { Nested } from '../object-state/types/Nested';
import { Flooded } from './Flooded';

// any in this context is representing the root form. 
export type FormCapsule<T> = {
    _name: string,
    _state: T,
    _error: Flooded<T, string>,
    _touched: Flooded<T, boolean>,
    _register: any,
    validateRef: React.MutableRefObject<(name: string) => boolean>
    setStateRoot: (name: string, val: SetStateAction<any>) => void,
    setErrorRoot: (key: string, val: SetStateAction<Flooded<any, string>>) => void,
    setTouchedRoot: (name: string, val: SetStateAction<Flooded<any, boolean>>) => void,
};

export type FormPartition<T> = {
    state: T,
    error: Flooded<T, string>,
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