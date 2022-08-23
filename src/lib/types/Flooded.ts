export type Flooded<T, F> = T extends Record<string, unknown>
    ? { [key in keyof T]: Flooded<T[key], F> }
    : T extends (infer U)[]
        ? Flooded<U, F>[]
        : F;
