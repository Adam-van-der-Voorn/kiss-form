import { useCallback } from 'react';
import { Nested } from './types/Nested';

export default function arrayFunctions<FormInput extends Record<string, any>>(name: string, data: Extract<Nested<FormInput>, unknown[]>, setData: (subname: string, value: Nested<FormInput>) => void) {
    const replace = useCallback((value: Extract<Nested<FormInput>, any[]>) => {
        setData(name, value);
    }, [setData]);

    const push = useCallback((value: Nested<FormInput>) => {
        const newArr = [...data, value];
        setData(name, newArr as any);
    }, [data, setData]);

    const remove = useCallback((idx: number) => {
        data.splice(idx, 1);
        setData(name, data);
    }, [data, setData]);

    return { replace, push, remove };
}