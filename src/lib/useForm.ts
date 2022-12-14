import { FormEvent, SetStateAction, useCallback, useMemo, useRef } from 'react';
import { FormCapsule, Submit, Register } from './types/useFormTypes';
import useNestedState from './object-state/useNestedState';
import flood from './private/util/flood';
import { Flooded } from './types/Flooded';
import objIsEmpty from './private/util/objIsEmpty';
import getNestedValue from './object-state/util/getNestedValue';

type Opts<T> = {
    validation?: (input: T) => Partial<Flooded<T, string>>;
};

export default function useForm<FormInput extends Record<string, any>>(initialData: FormInput, onSubmit: Submit<FormInput>, opts?: Opts<FormInput>) {
    const validation = opts?.validation;
    const validateRef = useRef<any>(null);
    const [state, setState] = useNestedState(initialData);
    // has to be any internally to avoid 'type instantiation is excessively deep and possibly infinite'
    const [touched, setTouched] = useNestedState<any>(flood(initialData, false));
    const [error, setError] = useNestedState<any>(flood(initialData, ''));

    const _register = useCallback((name: string, value: any) => {
        const onChange = (ev: FormEvent<HTMLInputElement>) => {
            setState(name, ev.currentTarget.value as any);
        };
        const onBlur = () => {
            setTouched(name, true as any);
            validateRef.current(name);
        };
        return { name, value, onChange, onBlur };
    }, [setState, setTouched]);
    
    const register: Register = useCallback((name: string) => {
        const value = getNestedValue(state, name);
        return _register(name, value);
    }, [_register, state]);

    const validate: (name: string) => boolean = name => {
        if (!validation) {
            return true;
        }
        const validationResult = validation(state);
        const scopedValidationResult = getNestedValue(validationResult, name) as any;
        setError(name, scopedValidationResult);
        return objIsEmpty(validationResult);
    };

    validateRef.current = validate;

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        if (!validate('')) {
            return;
        }
        onSubmit(state);
    };

    const formCapsule: FormCapsule<FormInput> = useMemo(() => ({
        _name: '',
        _state: state,
        _error: error,
        _touched: touched as Flooded<FormInput, boolean>,
        _register,
        validateRef,
        setStateRoot: setState,
        setErrorRoot: setError,
        setTouchedRoot: setTouched as (name: string, val: SetStateAction<Flooded<any, boolean>>) => void,
    }), [state, error, touched, _register, setState, setError, setTouched]);

    return { touched, error, state, setState, register, handleSubmit, formCapsule };
}