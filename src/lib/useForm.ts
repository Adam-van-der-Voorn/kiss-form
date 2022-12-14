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
    const [error, setError] = useNestedState<any>(flood(initialData, ''));
    const [touched, setTouched] = useNestedState<any>(flood(initialData, false));
    const [dirty, setDirty] = useNestedState<any>(flood(initialData, false));

    const _register = useCallback((name: string, value: any, altCallbacks?: any) => {
        const onChange = (ev: FormEvent<HTMLInputElement>) => {
            setState(name, ev.currentTarget.value as any);
            setDirty(name, true);
            if (altCallbacks?.onChange) {
                altCallbacks.onChange(ev);
            }
        };
        const onBlur = (ev: FormEvent<HTMLInputElement>) => {
            setTouched(name, true);
            validateRef.current(name);
            if (altCallbacks?.onBlur) {
                altCallbacks.onBlur(ev);
            }
        };
        return { name, value, onChange, onBlur };
    }, [setDirty, setState, setTouched]);
    
    const register: Register = useCallback((name: string, altCallbacks?: any) => {
        const value = getNestedValue(state, name);
        if (value === undefined) {
            console.error(`kiss-form: Attempted to register '${name}, but an entry for '${name}' could not be found in`, state);
            return { name };
        }
        return _register(name, value, altCallbacks);
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
        _touched: touched,
        _dirty: dirty,
        _register,
        validateRef,
        setStateRoot: setState,
        setErrorRoot: setError,
        setTouchedRoot: setTouched as (name: string, val: SetStateAction<Flooded<any, boolean>>) => void,
        setDirtyRoot: setDirty,
    }), [state, error, touched, dirty, _register, setState, setError, setTouched, setDirty]);

    return { state, error, touched, dirty, setState, register, handleSubmit, formCapsule };
}