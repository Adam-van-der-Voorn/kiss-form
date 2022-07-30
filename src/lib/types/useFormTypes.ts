import { Nested } from "./Nested";

export type FormInterface<T> = {
    setFormState: (name: string, val: Nested<T>) => void
}

export type Submit<T> = ((formInput: T) => Promise<void>) | ((formInput: T) => void);