import React, { useState } from 'react';
import { Nested } from '../../lib/object-state/types/Nested';
import trimObject from '../../lib/private/util/trimObject';
import { Flooded } from '../../lib/types/Flooded';
import { FormInterface, Register } from '../../lib/types/useFormTypes';
import useForm from '../../lib/useForm';
import useNameForPlaceholder from '../util/useNameForPlaceholder';
import ShoppingCart from './ShoppingCart';

const defaultInitialData = {
    addr: '',
    cart: {
        couponNo: '',
        items: [] as { item: string, quantity: string; }[]
    }
};

export type FormInput = typeof defaultInitialData;

type FormContextType = {
    state: FormInput,
    setState: (name: string, val: React.SetStateAction<Nested<FormInput>>) => void,
    register: Register,
    touched: Flooded<FormInput, boolean>,
    form: FormInterface<FormInput>;
};

export const FormContext = React.createContext<FormContextType>({} as any);


type Props = {
    initialData?: FormInput;
};

function Form1({ initialData }: Props) {

    const [submittedData, setSubmittedData] = useState<any>(null);

    if (!initialData) {
        initialData = defaultInitialData;
    }

    const onSubmit = (data: FormInput) => {
        console.log('submit!', data);
        setSubmittedData(trimObject(data));
    };

    useNameForPlaceholder();

    const { state, handleSubmit, form: { register, touched, setState }, form } = useForm(initialData, onSubmit);
    const formStuff = { state, setState, register, touched, form };

    return (
        <FormContext.Provider value={formStuff}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={state.addr} {...register('addr')} autoComplete="off" />
                </div>
                <ShoppingCart />
                <pre id="form-state">
                    {JSON.stringify(trimObject(state), null, 2)}
                </pre>
                <input type="submit" />
                <pre id="form-touched">
                    {JSON.stringify(touched, null, 2)}
                </pre>
                <pre id="submitted-data">
                    {JSON.stringify(submittedData, null, 2)}
                </pre>
            </form>
        </FormContext.Provider>
    );
}

export default Form1;