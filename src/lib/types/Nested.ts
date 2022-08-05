export type Nested<T> = T extends Record<string, infer U>
    ? Nested<U> | T
    : T extends (infer U)[]
        ? Nested<U> | T
        : T;