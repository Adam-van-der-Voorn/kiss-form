import { Nested } from "./Nested";

export type SetFormStateAction<T> = Nested<T> | ((prevState: T | Nested<T>) => Nested<T>);
