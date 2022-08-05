import { FormEvent } from "react";
import { Nested } from "./Nested";

export type FormInterface<T> = {
    setFormState: (name: string, val: Nested<T>) => void,
    register: Register;
};

export type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export type Register = (name: string) => {
    name: string;
    onChange: (ev: FormEvent<HTMLInputElement>) => void;
};