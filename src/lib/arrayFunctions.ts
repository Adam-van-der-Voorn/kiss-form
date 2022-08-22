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

    return { replace, push, remove };
}