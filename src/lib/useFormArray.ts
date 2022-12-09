import { useCallback } from 'react';
import { Nested } from './object-state/types/Nested';
import { FormCapsule } from './types/useFormTypes';
import flood from './private/util/flood';

export default function useFormArray<Base extends Record<string, unknown>, Sub extends Extract<Nested<Base>, unknown[]>>(
    subname: string,
    formCapsule: FormCapsule<Base>
) {

    const {
        _setState: setState,
        _setTouched: setTouched
    } = formCapsule;

    const _push = (arr: any, value: any) => {
        const newArr = [...arr, value];
        return newArr as any;
    };

    const _remove = (arr: any, idx: number) => {
        arr.splice(idx, 1);
        return [...arr] as any;
    };

    const _insert = (arr: any, idx: number, value: any) => {
        const newArr = [...arr.slice(0, idx), value, ...arr.slice(idx)];
        return newArr as any;
    };

    const replace = useCallback((value: Sub) => {
        setState(subname, value);
        setTouched(subname, flood(value, false));
    }, [subname, setState, setTouched]);

    const push = useCallback((value: Sub[0]) => {
        setState(subname, (oldArr: any) => _push(oldArr, value));
        setTouched(subname, (oldArr: any) => _push(oldArr, flood(value, false)));
    }, [subname, setState, setTouched]);

    const remove = useCallback((idx: number) => {
        setState(subname, (oldArr: any) => _remove(oldArr, idx));
        setTouched(subname, (oldArr: any) => _remove(oldArr, idx));
    }, [subname, setState, setTouched]);

    const insert = useCallback((idx: number, value: Sub[0]) => {
        setState(subname, (oldArr: any) => _insert(oldArr, idx, value));
        setTouched(subname, (oldArr: any) => _insert(oldArr, idx, flood(value, false)));
    }, [subname, setState, setTouched]);

    return { replace, push, remove, insert };
}