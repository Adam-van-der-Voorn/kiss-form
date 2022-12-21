import { useCallback, useMemo } from 'react';
import { Nested } from './object-state/types/Nested';
import { FormCapsule } from './types/useFormTypes';
import flood from './private/util/flood';
import concatName from './private/util/concatName';

export default function useFormArray<Base extends Record<string, unknown>, Sub extends Extract<Nested<Base>, unknown[]>>(
    relativeName: string,
    formCapsule: FormCapsule<Base>
) {

    const { _name: baseName, setStateRoot, setErrorRoot, setTouchedRoot, setDirtyRoot } = formCapsule;

    const absoluteName = useMemo(() => {
        return concatName(baseName, relativeName);
    }, [baseName, relativeName]);

    const replace = useCallback((value: Sub) => {
        setStateRoot(absoluteName, value);
        setErrorRoot(absoluteName, flood(value, ''));
        setTouchedRoot(absoluteName, flood(value, false));
        setDirtyRoot(absoluteName, flood(value, false));
    }, [absoluteName, setDirtyRoot, setErrorRoot, setStateRoot, setTouchedRoot]);

    const push = useCallback((value: Sub[0]) => {
        setStateRoot(absoluteName, (oldArr: any) => _push(oldArr, value));
        setErrorRoot(absoluteName, (oldArr: any) => _push(oldArr, flood(value, '')));
        setTouchedRoot(absoluteName, (oldArr: any) => _push(oldArr, flood(value, false)));
        setDirtyRoot(absoluteName, (oldArr: any) => _push(oldArr, flood(value, false)));
    }, [absoluteName, setDirtyRoot, setErrorRoot, setStateRoot, setTouchedRoot]);

    const remove = useCallback((idx: number) => {
        try {
            setStateRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
            setErrorRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
            setTouchedRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
            setDirtyRoot(absoluteName, (oldArr: any) => _remove(oldArr, idx));
        }
        catch (e) {
            if (e instanceof RangeError) {
                console.error(`while removing an element from ${absoluteName}: ${e.message}.`);
                return;
            }
            throw e;
        }
    }, [absoluteName, setDirtyRoot, setErrorRoot, setStateRoot, setTouchedRoot]);

    const insert = useCallback((idx: number, value: Sub[0]) => {
        try {
            setStateRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, value));
            setErrorRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, flood(value, '')));
            setTouchedRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, flood(value, false)));
            setDirtyRoot(absoluteName, (oldArr: any) => _insert(oldArr, idx, flood(value, false)));
        }
        catch (e) {
            if (e instanceof RangeError) {
                console.error(`while inserting an element into ${absoluteName}: ${e.message}.`);
                return;
            }
            throw e;
        }
    }, [absoluteName, setDirtyRoot, setErrorRoot, setStateRoot, setTouchedRoot]);

    return { replace, push, remove, insert };
}

const _push = (arr: any, value: any) => {
    const newArr = [...arr, value];
    return newArr as any;
};

const _remove = (arr: any, idx: number) => {
    if (idx >= arr.length || idx < 0) {
        throw new RangeError(`index ${idx} is out of bounds for length ${arr.length}`);
    }
    arr.splice(idx, 1);
    return [...arr] as any;
};

const _insert = (arr: any, idx: number, value: any) => {
    if (idx >= arr.length || idx < 0) {
        throw new RangeError(`index ${idx} is out of bounds for length ${arr.length}`);
    }
    const newArr = [...arr.slice(0, idx), value, ...arr.slice(idx)];
    return newArr as any;
};

