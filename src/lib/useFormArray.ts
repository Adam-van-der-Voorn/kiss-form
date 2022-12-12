import { useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import { FormCapsule } from './types/useFormTypes';
import flood from './private/util/flood';
import concatName from './private/util/concatName';

export default function useFormArray<Base extends Record<string, unknown>, Sub extends Extract<Nested<Base>, unknown[]>>(
    relativeName: string,
    formCapsule: FormCapsule<Base>
) {

    const { _name: baseName, setStateRoot, setTouchedRoot } = formCapsule;

    const absoluteName = useMemo(() => {
        return concatName(baseName, relativeName);
    }, [baseName, relativeName]);

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
        setStateRoot(absoluteName, value);
        setTouchedRoot(absoluteName, flood(value, false));
    }, [absoluteName, setStateRoot, setTouchedRoot]);

    const push = useCallback((value: Sub[0]) => {
        setStateRoot(absoluteName, (oldArr: any) => _push(oldArr, value));
        setTouchedRoot(absoluteName, (oldArr: any) => _push(oldArr, flood(value, false)));
    }, [absoluteName, setStateRoot, setTouchedRoot]);

    const remove = useCallback((idx: number) => {
        setStateRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
        setTouchedRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
    }, [absoluteName, setStateRoot, setTouchedRoot]);

    const insert = useCallback((idx: number, value: Sub[0]) => {
        setStateRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, value));
        setTouchedRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, flood(value, false)));
    }, [absoluteName, setStateRoot, setTouchedRoot]);

    return { replace, push, remove, insert };
}