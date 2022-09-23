import { Nested } from '../object-state/types/Nested';

export type SetFormStateAction<T> = Nested<T> | ((prevState: T | Nested<T>) => Nested<T>);
