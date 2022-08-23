import { FormEvent } from "react";
import { SetFormStateAction } from "./setFormStateAction";

export type FormInterface<T> = {
    setTouched: (key: string, val: any) => void,
    setFormState: (name: string, val: SetFormStateAction<T>) => void,
    register: Register;
};

export type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);

export type Register = (name: string) => {
    name: string;
    onChange: (ev: FormEvent<HTMLInputElement>) => void;
};