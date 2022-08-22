import { useCallback } from 'react';
import { Nested } from './object-state/types/Nested';
import { FormInterface } from './types/useFormTypes';

export default function arrayFunctions<FormInput extends Record<string, any>>(
    subname: string,
    formInterface: FormInterface<FormInput> 
) {

    const { setFormState: setState } = formInterface;

    const replace = useCallback((value: Extract<Nested<FormInput>, any[]>) => {
        setState(subname, value);
    }, [setState]);

    const push = useCallback((value: Nested<FormInput>) => {
        setState(subname, (oldArr: any) => {
            const newArr = [...oldArr, value];
            return newArr as any;
        });
    }, [setState]);

    const remove = useCallback((idx: number) => {
        setState(subname, (oldArr: any) => {
            oldArr.splice(idx, 1);
            return [...oldArr] as any;
        });
    }, [setState]);

    const insert = useCallback((idx: number, value: Nested<FormInput>) => {
        setState(subname, (oldArr: any) => {
            console.log("insert b4:", oldArr);
            const newArr = [...oldArr.slice(0, idx), value, ...oldArr.slice(idx)]
            console.log("insert after:", newArr)
            return newArr as any;
        });
    }, [setState]);

    return { replace, push, remove, insert };
}