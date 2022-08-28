import { useCallback } from 'react';
import { Nested } from './object-state/types/Nested';
import { FormInterface } from './types/useFormTypes';
import flood from './private/util/flood';

export default function arrayFunctions<FormInput extends Record<string, any>>(
    subname: string,
    formInterface: FormInterface<FormInput>
) {

    const { setState, setTouched } = formInterface;

    const _push = (arr: any, value: any) => {
        const newArr = [...arr, value];
        return newArr as any;
    }

    const _remove = (arr: any, idx: number) => {
        arr.splice(idx, 1);
        return [...arr] as any;
    };

    const _insert = (arr: any, idx: number, value: any) => {
        const newArr = [...arr.slice(0, idx), value, ...arr.slice(idx)];
        return newArr as any;
    }

    const replace = useCallback((value: Extract<Nested<FormInput>, any[]>) => {
        setState(subname, value);
        setTouched(subname, flood(value, false));
    }, [setState, setTouched]);

    const push = useCallback((value: Nested<FormInput>) => {
        setState(subname, (oldArr: any) => _push(oldArr, value));
        setTouched(subname, (oldArr: any) => _push(oldArr, flood(value, false)))
    }, [setState, setTouched]);

    const remove = useCallback((idx: number) => {
        setState(subname, (oldArr: any) => _remove(oldArr, idx));
        setTouched(subname, (oldArr: any) => _remove(oldArr, idx));
    }, [setState, setTouched]);

    const insert = useCallback((idx: number, value: Nested<FormInput>) => {
        setState(subname, (oldArr: any) => _insert(oldArr, idx, value));
        setTouched(subname, (oldArr: any) => _insert(oldArr, idx, flood(value, false)));
    }, [setState, setTouched]);

    return { replace, push, remove, insert };
}