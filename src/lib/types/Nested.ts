export type Nested<T> = T | (
    T extends Record<string, infer U> ? Nested<U> | T : T
); 