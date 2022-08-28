import { FormEvent, SetStateAction } from "react";
import { Nested } from "../object-state/types/Nested";
import { Flooded } from "./Flooded";

export type FormInterface<T> = {
    touched: Flooded<T, boolean>;
    setTouched: (name: string, val: SetStateAction<Flooded<Nested<T>, boolean>>) => void,
    setState: (name: string, val: SetStateAction<Nested<T>>) => void,
    register: Register;
};

export type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export type Register = (name: string) => {
    name: string;
    onChange: (ev: FormEvent<HTMLInputElement>) => void;
    onBlur: (ev: FormEvent<HTMLInputElement>) => void;
};